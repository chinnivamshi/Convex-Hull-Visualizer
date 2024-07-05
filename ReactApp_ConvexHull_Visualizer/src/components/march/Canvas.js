
// // Canvas.js Best Code
import React, { useEffect, useRef } from "react";

const Canvas = ({
  points,
  convexHullPoints,
  currentStep,
  myArr,
  currentState,
  selectedEffect,
  onClick,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (selectedEffect === "displayStates") {
      // console.log(selectedEffect)
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw input points
      ctx.fillStyle = "#008ae6"; //colour of points
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Loop through states in myArr
      //myArr.forEach(state => {
      const [p1, p2, p3, hull, count] = myArr[currentState];

      // Draw hull points
      ctx.fillStyle = "black";
      hull.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Connect hull points with red solid line
      ctx.strokeStyle = "#ff751a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      //console.log(hull);
      hull.forEach(({ x, y }, index) => {
        if (index <= count + 1) {
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            if (index === count + 1) {
            } else {
              ctx.lineTo(x, y);
              //console.log("Hello");
            }
          }
        }
      });
      ctx.closePath();
      ctx.stroke();

      // Connect p1 to p2 with red dotted line
      ctx.strokeStyle = "#ff751a";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Connect p1 to p3 with blue dotted line
      ctx.strokeStyle = "#008ae6";
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.stroke();

      // Reset line dash to default
      ctx.setLineDash([]);
      // });
    }

    // if (selectedEffect=== ("renderCanvas" || null)){
    else {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = "#008ae6"; //colour of points
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Draw convex hull up to current step
      ctx.strokeStyle = "#ff751a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      convexHullPoints.slice(0, currentStep + 1).forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }
  }, [
    points,
    convexHullPoints,
    currentStep,
    myArr,
    currentState,
    selectedEffect,
  ]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    onClick({ x, y });
  };
  const canvasStyle = {
    border: '1px solid black',
    backgroundColor: 'rgba(255, 255, 255, 1)' // White color with full opacity
  };

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={500}
      onClick={handleCanvasClick}
      style={canvasStyle}
    ></canvas>
  );
};

export default Canvas;