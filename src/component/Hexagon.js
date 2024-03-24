import React from "react";
import CityCenImg from "../Image/d2x297b-54f069b5-efef-407c-8bb4-bf81f4b547f4.png";
import CrewImg from "../Image/Knight.png";
import TreeA1Img from "../Image/treeA1.png";
import TreeA2Img from "../Image/treeA2.png";
import TreeA3Img from "../Image/treeA3.png";
import DessertB1Img from "../Image/desertC1.png";
import DessertB2Img from "../Image/desertC2.png";
import DessertB3 from "../Image/desertC3.png";
import BoatC1Img from "../Image/boatB1.png";
import BoatC2Img from "../Image/boatB2.png";
import BoatC3Img from "../Image/boatB3.png";
import GreyD1Img from "../Image/greyD1.png";
import GreyD2Img from "../Image/greyD2.png";
import GreyD3Img from "../Image/greyD3.png";
import HexRed from "../Image/hexRed.png";
import Crew from "../Image/pngtree-viking-cartoon-character-sprite-sheet-animation-for-2d-rpg-game-png-image_6328460.png";
import "./Hexagon.css";
import { useState, useRef } from "react";

const Hexagon = ({ map, allPlayer, Me }) => {
  const [zoomed, setZoomed] = useState(false);
  const [hexSize, setHexSize] = useState(50);
  const [mgL, setMgL] = useState(-13.5);
  const [mgB, setMgB] = useState(-33);
  const [mgt, setMgT] = useState(25);
  const [Imgt, setiMgT] = useState(22);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const containerRef = useRef(null);


  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = "auto";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    containerRef.current.scrollLeft -= deltaX;
    containerRef.current.scrollTop -= deltaY;

    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  return (
    <div
      style={{
        width: "700px",
        height: "400px",
        marginRight: "100px",
        marginTop: "50px",
        border: "2px solid black",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <div
        ref={containerRef}
        style={{ overflow: "hidden", background: "#ffffff" }}
        onWheel={(e) => {
          if (e.deltaY > 0 && hexSize > 50) {
            setHexSize(hexSize - 5);
            setMgB(mgB + 2.16666667);
            setMgL(mgL + 0.833333);
            setiMgT(Imgt - 1.16666667);
          } else if (e.deltaY < 0 && hexSize < 80) {
            setHexSize(hexSize + 5);
            setMgB(mgB - 2.16666667);
            setMgL(mgL - 0.833333);
            setiMgT(Imgt + 1.16666667);
          }
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="hexagon-map-container"
      >
        <div
          className="main-map"
          style={{ width: "100%", height: "100%", paddingLeft: "50px" }}
        >
          {map.map((row, rowIndex) => (
            <div key={rowIndex} className="hexagon-row">
              {row.map((hex, colIndex) => {
                const isCrewHere = allPlayer.some(
                  (player) =>
                    player.crew.position.row === hex.row &&
                    player.crew.position.col === hex.col &&
                    player.crew.myownName === Me
                );
                // const MyCrew = allPlayer.some(
                //   (player) => player.crew.myownName === Me
                // );

                const marginTop = colIndex % 2 === 0 ? mgt : mgt - Imgt;

                const lastRowHexagon1I0 =
                  rowIndex === 7 && colIndex % 2 === 0 ? " hexagon1I0" : "";
                const lastRowHexagon1I1 =
                  rowIndex === 7 && colIndex % 2 !== 0 ? " hexagon1I1" : "";
                const startcowHexagon3 = colIndex === 10 ? " hexagon3I" : "";
                // const startcowHexagon4 = (colIndex === 10  && rowIndex === 7 ) ? " hexagon4I" : "";

                const treeMap = [
                  // TreeA1 * 5
                  { row: 0, col: 0, img: TreeA1Img },
                  { row: 0, col: 1, img: TreeA1Img },
                  { row: 0, col: 2, img: TreeA1Img },
                  { row: 0, col: 3, img: TreeA1Img },
                  { row: 0, col: 4, img: TreeA1Img },
                  { row: 0, col: 5, img: TreeA1Img },
                  { row: 0, col: 6, img: TreeA1Img },
                  { row: 0, col: 7, img: TreeA1Img },
                  { row: 0, col: 8, img: TreeA1Img },
                  { row: 0, col: 9, img: TreeA1Img },
                  { row: 7, col: 0, img: TreeA1Img },
                  { row: 6, col: 0, img: TreeA1Img },
                  { row: 5, col: 0, img: TreeA1Img },
                  { row: 4, col: 0, img: TreeA1Img },
                  { row: 3, col: 0, img: TreeA1Img },
                  { row: 2, col: 0, img: TreeA1Img },
                  { row: 1, col: 0, img: TreeA1Img },

                  // TreeA2 * 5
                  { row: 1, col: 0, img: TreeA2Img },
                  { row: 1, col: 1, img: TreeA2Img },
                  { row: 1, col: 2, img: TreeA2Img },
                  { row: 1, col: 3, img: TreeA2Img },
                  { row: 1, col: 4, img: TreeA2Img },

                  // TreeA3 * 5
                  { row: 2, col: 0, img: TreeA3Img },
                  { row: 2, col: 1, img: TreeA3Img },
                  { row: 2, col: 2, img: TreeA3Img },
                  { row: 2, col: 3, img: TreeA3Img },
                  { row: 2, col: 4, img: TreeA3Img },

                  // BoatC1 * 5
                  { row: 8, col: 0, img: BoatC1Img },
                  { row: 9, col: 0, img: BoatC1Img },
                  { row: 10, col: 0, img: BoatC1Img },
                  { row: 11, col: 0, img: BoatC1Img },
                  { row: 12, col: 0, img: BoatC1Img },
                  { row: 13, col: 0, img: BoatC1Img },
                  { row: 14, col: 0, img: BoatC1Img },

                  { row: 14, col: 1, img: BoatC1Img },
                  { row: 14, col: 2, img: BoatC1Img },
                  { row: 14, col: 3, img: BoatC1Img },
                  { row: 14, col: 4, img: BoatC1Img },
                  { row: 14, col: 5, img: BoatC1Img },
                  { row: 14, col: 6, img: BoatC1Img },
                  { row: 14, col: 7, img: BoatC1Img },
                  { row: 14, col: 8, img: BoatC1Img },
                  { row: 14, col: 9, img: BoatC1Img },

                  // BoatC2 * 5
                  { row: 9, col: 0, img: BoatC2Img },
                  { row: 9, col: 1, img: BoatC2Img },
                  { row: 9, col: 2, img: BoatC2Img },
                  { row: 9, col: 3, img: BoatC2Img },
                  { row: 9, col: 4, img: BoatC2Img },

                  // BoatC3 * 5
                  { row: 10, col: 0, img: BoatC3Img },
                  { row: 10, col: 1, img: BoatC3Img },
                  { row: 10, col: 2, img: BoatC3Img },
                  { row: 10, col: 3, img: BoatC3Img },
                  { row: 10, col: 4, img: BoatC3Img },

                  // DessertB1 * 5
                  { row: 8, col: 19, img: DessertB1Img },
                  { row: 9, col: 19, img: DessertB1Img },
                  { row: 10, col: 19, img: DessertB1Img },
                  { row: 11, col: 19, img: DessertB1Img },
                  { row: 12, col: 19, img: DessertB1Img },
                  { row: 13, col: 19, img: DessertB1Img },
                  { row: 14, col: 19, img: DessertB1Img },

                  { row: 14, col: 10, img: DessertB1Img },
                  { row: 14, col: 11, img: DessertB1Img },
                  { row: 14, col: 12, img: DessertB1Img },
                  { row: 14, col: 13, img: DessertB1Img },
                  { row: 14, col: 14, img: DessertB1Img },
                  { row: 14, col: 15, img: DessertB1Img },
                  { row: 14, col: 16, img: DessertB1Img },
                  { row: 14, col: 17, img: DessertB1Img },
                  { row: 14, col: 18, img: DessertB1Img },

                  // DessertB2 * 5
                  { row: 9, col: 10, img: DessertB2Img },
                  { row: 9, col: 11, img: DessertB2Img },
                  { row: 9, col: 12, img: DessertB2Img },
                  { row: 9, col: 13, img: DessertB2Img },
                  { row: 9, col: 14, img: DessertB2Img },

                  // DessertB3 * 5
                  { row: 10, col: 10, img: DessertB3 },
                  { row: 10, col: 11, img: DessertB3 },
                  { row: 10, col: 12, img: DessertB3 },
                  { row: 10, col: 13, img: DessertB3 },
                  { row: 10, col: 14, img: DessertB3 },

                  // GreyD1 * 5
                  { row: 0, col: 10, img: GreyD1Img },
                  { row: 0, col: 11, img: GreyD1Img },
                  { row: 0, col: 12, img: GreyD1Img },
                  { row: 0, col: 13, img: GreyD1Img },
                  { row: 0, col: 14, img: GreyD1Img },
                  { row: 0, col: 15, img: GreyD1Img },
                  { row: 0, col: 16, img: GreyD1Img },
                  { row: 0, col: 17, img: GreyD1Img },
                  { row: 0, col: 18, img: GreyD1Img },
                  { row: 0, col: 19, img: GreyD1Img },

                  { row: 1, col: 19, img: GreyD1Img },
                  { row: 2, col: 19, img: GreyD1Img },
                  { row: 3, col: 19, img: GreyD1Img },
                  { row: 4, col: 19, img: GreyD1Img },
                  { row: 5, col: 19, img: GreyD1Img },
                  { row: 6, col: 19, img: GreyD1Img },
                  { row: 7, col: 19, img: GreyD1Img },

                  // GreyD2 * 5
                  { row: 1, col: 10, img: GreyD2Img },
                  { row: 1, col: 11, img: GreyD2Img },
                  { row: 1, col: 12, img: GreyD2Img },
                  { row: 1, col: 13, img: GreyD2Img },
                  { row: 1, col: 14, img: GreyD2Img },

                  // GreyD3 * 5
                  { row: 2, col: 10, img: GreyD3Img },
                  { row: 2, col: 11, img: GreyD3Img },
                  { row: 2, col: 12, img: GreyD3Img },
                  { row: 2, col: 13, img: GreyD3Img },
                  { row: 2, col: 14, img: GreyD3Img },
                ];

                let treeImg = null;

                for (const mapping of treeMap) {
                  if (hex.row === mapping.row && hex.col === mapping.col) {
                    treeImg = mapping.img;
                    break;
                  }
                }

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={
                      (rowIndex < map.length / 2 && colIndex < row.length / 2
                        ? "hexagon1"
                        : rowIndex < map.length / 2 &&
                          colIndex >= row.length / 2
                        ? "hexagon4"
                        : rowIndex >= map.length / 2 &&
                          colIndex < row.length / 2
                        ? "hexagon2"
                        : "hexagon3") +
                      lastRowHexagon1I0 +
                      lastRowHexagon1I1 +
                      startcowHexagon3
                    }
                    style={{
                      marginLeft: `${mgL}px`,
                      marginBottom: `${mgB}px`,
                      marginTop: `${marginTop}px`,
                      width: `${hexSize}px`,
                      height: `${hexSize}px`,
                    }}
                  >
                    <div className="image-container">
                      {hex.whoBelongName === Me && (
                        <img
                          src={HexRed}
                          className="image"
                          style={{
                            width: `${hexSize * 1.43}%`,
                            height: `${hexSize * 1.2}%`,
                            marginTop: `${hexSize * 0.1}%`,
                            marginLeft: `${hexSize * 0.01}%`,
                            opacity: `${75}%`,
                          }}
                          alt="City Center"
                        />
                      )}

                      {hex.cityCenter && hex.whoBelongName === Me && (
                        <img
                          src={CityCenImg}
                          className="image"
                          style={{
                            width: `${hexSize * 1.3}%`,
                            height: `${hexSize * 1.3}%`,
                            marginTop: `${hexSize * 0.001}%`,
                            marginLeft: `${hexSize * 0.05}%`,
                          }}
                          alt="City Center"
                        />
                      )}
                      {isCrewHere && <img src={Crew} className="image" />}
                      {treeImg && !hex.cityCenter && (
                        <img
                          src={treeImg}
                          className="image"
                          style={{
                            width: `${hexSize * 1.2}%`,
                            height: `${hexSize * 1.2}%`,
                            marginTop: `${hexSize * 0.05}%`,
                            marginLeft: `${hexSize * 0.1}%`,
                          }}
                          alt={`Tree on hexagon ${rowIndex + 1}`}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hexagon;
