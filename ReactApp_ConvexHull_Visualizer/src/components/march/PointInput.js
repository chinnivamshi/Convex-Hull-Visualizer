// PointInput.js
import React, { useState, useRef, useEffect } from 'react';

const PointInput = ({ onPointClick }) => {
  const canvasRef = useRef(null);
  const [clickedPoints, setClickedPoints] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clickedPoints.forEach(point => {
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [clickedPoints]);

  const handleMouseDown = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setClickedPoints([...clickedPoints, { x, y }]);
  };

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      onMouseDown={handleMouseDown}
      style={{ border: '1px solid black' }}
    ></canvas>
  );
};

export default PointInput;
