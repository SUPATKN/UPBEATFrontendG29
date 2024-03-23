import React from "react";
import CityCenImg from "../Image/d2x297b-54f069b5-efef-407c-8bb4-bf81f4b547f4.png";
import CrewImg from "../Image/Knight.png";

const Hexagon = ({ map, allPlayer, Me }) => {
  return (
    <div className="hexagon-col-container">
      {map.map((row, rowIndex) => (
        <div key={rowIndex} className="hexagon-row">
          {row.map((hex, colIndex) => {
            const isCrewHere = allPlayer.some(
              (player) =>
                player.crew.position.row === hex.row &&
                player.crew.position.col === hex.col
            );

            return (
              <div
                key={colIndex}
                className={colIndex % 2 === 0 ? "hexagon-even" : "hexagon"}
              >
                <div
                  className={hex.whoBelongName === Me ? "hexagonMe" : ""}
                ></div>

                {hex.whoBelongName !== Me && (
                  <div
                    className={
                      hex.whoBelongName !== Me && hex.whoBelongName !== null
                        ? "hexagonOther"
                        : ""
                    }
                  ></div>
                )}
                <div className="">
                  {`row: ${hex.row + 1}, col: ${hex.col + 1}, cityCenter: ${
                    hex.cityCenter ? "true" : "false"
                  }, CurrentDep : ${hex.deposit.currentdep}`}
                </div>
                {hex.whoBelongName === Me && (
                  <div>
                    {hex.cityCenter && (
                      <img src={CityCenImg} className="image" />
                    )}
                    {isCrewHere && <img src={CrewImg} className="image" />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Hexagon;
