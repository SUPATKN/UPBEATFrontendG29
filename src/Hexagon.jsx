import React from "react";
import "./Hexagon.css";

const Hexagon = ({ size }) => {
  return (
    <div
      className="hexagon"
      style={{ width: size * 2, height: size * Math.sqrt(3) }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
      </svg>
    </div>
  );
};

export default Hexagon;
