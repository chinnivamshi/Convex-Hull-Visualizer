// App.js Best code
import React, { useState } from "react";
import Canvas from "./Canvas";
import Button from "./Button";
import convexHull from "./convexHull";
import "./march.css";

let check = 0;
let flag = 0;
let fhull = [];
let done = 0;

function App() {
  const [points, setPoints] = useState([]);
  const [convexHullPoints, setConvexHullPoints] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [myArr, setmyArr] = useState([]);
  const [currentState, setcurrentState] = useState(0);
  const [selectedEffect, setSelectedEffect] = useState(null);

  const handlePointClick = (newPoint) => {
    setPoints([...points, newPoint]);
  };

  const generateRandomPoints = () => {
    const randomPoints = [];
    for (let i = 0; i < 50; i++) {
      const randomX = Math.random() * 1200;
      const RandomY = Math.random() * 500;
      randomPoints.push({ x: randomX, y: RandomY });
    }
    setPoints([...points, ...randomPoints]);
  };

  let no_States = convexHull(points).length;

  const generateConvexHull = () => {
    if (points.length <= 2) {
      flag = 1;
    }
    else {
      flag = 0;
      done = 0;
      check = 0;
      fhull = convexHull(points);
      setConvexHullPoints(fhull[no_States - 1][3]);
      animateConvexHull(fhull[no_States - 1][3]);
      setSelectedEffect("renderCanvas");
      setmyArr(fhull);
    }
  };

  const animateConvexHull = (fhull) => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < fhull.length) {
        setCurrentStep(step);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the speed of animation here
  };

  const RunConvexHull = () => {
    const interval1 = setInterval(() => {
      if (!done) {
        nextState();
      } else {
        clearInterval(interval1);
      }
    }, 50); // Adjust the speed of animation here
  };

  const nextState = () => {
    if (check === -1) {
      check = check + 1;
      setcurrentState(check);
      setSelectedEffect("displayStates");
    }
    if (check < no_States) {
      setSelectedEffect("displayStates");
      setcurrentState(check);
      check = check + 1;
    } else if (check === no_States) {
      done = 1;
    }
  };
  const prevState = () => {
    done = 0;
    if (check === no_States) {
      check = check - 1;
      setcurrentState(check);
      setSelectedEffect("displayStates");
    }
    if (check >= 0) {
      setSelectedEffect("displayStates");
      setcurrentState(check);
      check = check - 1;
    }
  };

  return (
    <div className="App">
      <div class = "bg4"></div>
      <h1 class="only">Convex Hull Visualization</h1>
      <div className="canvas-container-1">
        <Canvas
          points={points}
          convexHullPoints={convexHullPoints}
          onClick={handlePointClick}
          currentStep={currentStep}
          myArr={myArr}
          currentState={currentState}
          selectedEffect={selectedEffect}
        />
      </div>
      <div className="button-container-1">
        {/* <Button onClick={generateConvexHull} label="Generate Convex Hull" />
        <Button onClick={nextState} label="Next State" />
        <Button onClick={prevState} label="Previous State" />
        <Button onClick={RunConvexHull} label="RunConvexHull" />
        <Button onClick={generateRandomPoints} label="Generate Random Points" /> */}
        {/* <Button onClick={generateConvexHull} label="Generate Convex Hull" /> */}
        <button class="button-85" role="button" onClick={generateConvexHull}>Generate Convex Hull</button>
        {/* <Button onClick={nextState} label="Next State" /> */}
        <button class="button-85" role="button" onClick={nextState}>Next State</button>
        {/* <Button onClick={prevState} label="Previous State" /> */}
        <button class="button-85" role="button" onClick={prevState}>Previous State</button>
        {/* <Button onClick={runConvexHull} label="RunConvexHull" /> */}
        <button class="button-85" role="button" onClick={RunConvexHull}>RunConvexHull</button>
        {/* <Button onClick={generateRandomPoints} label="Generate Random Points" /> */}
        <button class="button-85" role="button" onClick={generateRandomPoints}>Generate Random Points</button>

      </div>
      {check >= 1 && check <= no_States ? (
        <div className="description-container-1">
          <p>
            The points lying on the Convex Hull are denoted by black colour. Red
            solid line indicates the edges of Convex Hull. Red dotted line
            indicates the Candidate edge of the Convex Hull. Blue dotted line indicates the
            current processing edge.
          </p>
        </div>
      ) : (
        <div className="description-container-1">
          <p>
            Starting from a leftmost point of the data set, we keep the points
            in the convex hull by anti-clockwise rotation. From a current point,
            we can choose the next point by checking the orientations of those
            points from the current point. When the angle is largest, the point
            is chosen. After completing all points, when the next point is the
            start point, stop the algorithm.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
