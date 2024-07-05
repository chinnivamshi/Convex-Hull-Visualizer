// App.js
import React, { useState } from 'react';
import Canvas from './Canvas';
import Button from './Button';
import convexHull from './convexHull';
import './kpm.css';

let check = -1;
// let firstTime = 0;
let fhull = [];
let noOfStates = 21;
let done = 0;
// let storePoints = [];

function App() {
  const [points, setPoints] = useState([]);
  const [convexHullPoints, setConvexHullPoints] = useState([]);
  // const [medianLine, setMedianLine] = useState(null); // State to hold the median line
  const [currentState, setCurrentState] = useState(-1);
  const [myArr, setMyArr] = useState([]);
  const [description, setDescription] = useState("You can see the Description for each state here.");

  // let noOfStates = 0;
  const handlePointClick = (newPoint) => {
    setPoints([...points, newPoint]);
    // storePoints = [...points,newPoint];
  };

  const updateDescription = (newDescription) => {
    setDescription(newDescription);
  };

  const generateRandomPoints = () => {
    const randomPoints = [];
    for (let i = 0; i < 50; i++) {
      // Generate random x and y coordinates within canvas dimensions
      const randomX = Math.random() * 1200; // Change canvasWidth to your canvas width
      const randomY = Math.random() * 500; // Change canvasHeight to your canvas height
      randomPoints.push({ x: randomX, y: randomY });
    }
    // points.push(...randomPoints);
    setPoints([...points, ...randomPoints]);
  };

  const generateConvexHull = () => {
    if(points.length === 0){
      return;
    }
    done = 0;
    check = -1;
    fhull = convexHull(points);
    console.log(points.length);
    console.log(fhull.length);
    setConvexHullPoints(fhull[fhull.length - 1][2]);
    setMyArr(fhull);
  };

  const runConvexHull = () => {
    const interval = setInterval(() => {
      if (!done) {
        nextState();
      }
      else {
        clearInterval(interval);
      }
    }, 600)
  };

  const nextState = () => {
    // document.getElementById("description-container").innerHTML = "Description for";
    if (points.length === 3 || points.length === 2 || points.length === 1) {
      updateDescription("Input contains <=3 points which is a base case (no steps will be present)")
      return;
    }
    
    if (check < noOfStates - 1) {
      check = check + 1;
      setCurrentState(check);
    }
    else if (check === noOfStates - 1) {
      done = 1;
    }
  };

  const prevState = () => {
    done = 0;
    if (check > 0) {
      check = check - 1;
      setCurrentState(check);
    }
  };

  return (
    <div className="App">
      <div class = "bg1"></div>
      <h1 class="only1">Convex Hull Visualization</h1>
      <div className="canvas-container">
        <Canvas points={points} convexHullPoints={convexHullPoints} onClick={handlePointClick} currentState={currentState} myArr={myArr} updateDescription={updateDescription} />
      </div>
      <div className="button-container">
        {/* <Button onClick={generateConvexHull} label="Generate Convex Hull" /> */}
        <button class="button-85" role="button" onClick={generateConvexHull}>Generate Convex Hull</button>
        {/* <Button onClick={nextState} label="Next State" /> */}
        <button class="button-85" role="button" onClick={nextState}>Next State</button>
        {/* <Button onClick={prevState} label="Previous State" /> */}
        <button class="button-85" role="button" onClick={prevState}>Previous State</button>
        {/* <Button onClick={runConvexHull} label="RunConvexHull" /> */}
        <button class="button-85" role="button" onClick={runConvexHull}>RunConvexHull</button>
        {/* <Button onClick={generateRandomPoints} label="Generate Random Points" /> */}
        <button class="button-85" role="button" onClick={generateRandomPoints}>Generate Random Points</button>
      </div>
      <div className="description-container">
        <p className="stateText">{description}</p>
      </div>
    </div>
  );
}

export default App;
