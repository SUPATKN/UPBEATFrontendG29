import React from "react";
import HexagonGrid from "./hexagonGrid";
import times from "lodash/times";

const HexGridDemo = () => {
  const getHexProps = (hexagon) => {
    return {
      style: {
        fill: "#FFFFFF",
        stroke: "black",
      },
      onClick: () => alert(`Hexagon n.${hexagon} has been clicked`),
    };
  };

  const renderHexagonContent = (hexagon) => {
    return (
      <text
        x="50%"
        y="50%"
        fontSize={100}
        fontWeight="lighter"
        style={{ fill: "white" }}
        textAnchor="middle"
      >
        {hexagon}
      </text>
    );
  };

  let hexagons = times(100, (id) => id); //จำนวน Cell

  return (
    <HexagonGrid
      gridWidth={500}
      gridHeight={500}
      hexagons={hexagons}
      hexProps={getHexProps}
      renderHexagonContent={renderHexagonContent}
    />
  );
};

export default HexGridDemo;
