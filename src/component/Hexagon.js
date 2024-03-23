import React, { useState, useRef } from "react";
import CityCenImg from "../Image/d2x297b-54f069b5-efef-407c-8bb4-bf81f4b547f4.png";
import CrewImg from "../Image/Knight.png";
import TreeA1Img from "../Image/treeA1.png";
import TreeA2Img from "../Image/treeA2.png";
import TreeA3Img from "../Image/treeA3.png";
import DessertB1Img from "../Image/desertB1.png";
import DessertB2Img from "../Image/desertB2.png";
import DessertB3 from "../Image/desertB3.png";
import BoatC1Img from "../Image/boatC1_1.png";
import BoatC2Img  from "../Image/boatC2.png";
import BoatC3Img  from "../Image/boatC3.png";
import "./Hexagon.css";

const Hexagon = ({ map, allPlayer }) => {
  const [zoomed, setZoomed] = useState(false); 
  const [hexSize, setHexSize] = useState(50); 
  const [mgL, setMgL] = useState(-11); 
  const [mgB, setMgB] = useState(-30); 
  const [mgt, setMgT] = useState(25);
  const [Imgt, setiMgT] = useState(23);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const containerRef = useRef(null);

  console.log(hexSize,mgL,mgB,mgt,Imgt);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = 'auto';
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
    <div style={{width: "900px", height: "400px",marginRight:"100px",marginTop:"50px", border: "2px solid black", overflow: "hidden", background: "#ffffff" }}>

    <div
      ref={containerRef}
      style={{overflow: "hidden", background: "#ffffff" }}
      onWheel={(e) => {
        if (e.deltaY > 0 && hexSize > 50) {
          setHexSize(hexSize - 5);
          setMgB(mgB + 0.5);
          setMgL(mgL + 0.833333);
          setiMgT(Imgt - 2);
        } else if (e.deltaY < 0 && hexSize < 80) {
          setHexSize(hexSize + 5);
          setMgB(mgB - 0.5);
          setMgL(mgL - 0.833333);
          setiMgT(Imgt + 2);
        }
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="hexagon-map-container"
    >
      <div className="main-map" style={{ width: "80%", height: "80%" ,paddingLeft:"50px"}}>
        {map.map((row, rowIndex) => (
          <div key={rowIndex} className="hexagon-row">
            {row.map((hex, colIndex) => {
              const isCrewHere = allPlayer.some(
                (player) =>
                  player.crew.position.row === hex.row &&
                  player.crew.position.col === hex.col
              );

              const marginTop = colIndex % 2 === 0 ? mgt : mgt - Imgt;

              
              const lastRowHexagon1 = rowIndex === 7  ? " hexagon1I" : "";
              const startcowHexagon4 = colIndex === 10  ? " hexagon2I" : "";


              const treeMap = [
                { row: 3, col: 5, img: TreeA1Img },
                { row: 5, col: 3, img: TreeA1Img },
                { row: 0, col: 1, img: TreeA1Img },
                { row: 5, col: 7, img: TreeA1Img },
                { row: 7, col: 0, img: TreeA1Img },
                { row: 5, col: 5, img: TreeA2Img },
                { row: 1, col: 3, img: TreeA2Img },
                { row: 5, col: 1, img: TreeA2Img },
                { row: 3, col: 2, img: TreeA2Img },
                { row: 2, col: 9, img: TreeA2Img },
                { row: 6, col: 4, img: TreeA2Img },
                { row: 7, col: 5, img: TreeA3Img },
                { row: 1, col: 7, img: TreeA3Img },
                { row: 2, col: 4, img: TreeA3Img },
                { row: 3, col: 7, img: TreeA3Img },
                { row: 1, col: 0, img: TreeA3Img },
                { row: 7, col: 9, img: TreeA3Img },

                { row: 9, col: 1, img: BoatC1Img },
                { row: 9, col: 8, img: BoatC1Img },
                { row: 10, col: 5, img: BoatC1Img },
                { row: 14, col: 7, img: BoatC1Img },
                { row: 11, col: 0, img: BoatC1Img },
                { row: 10, col: 8, img: BoatC2Img },
                { row: 9, col: 9, img: BoatC2Img },
                { row: 11, col: 5, img: BoatC2Img },
                { row: 13, col: 9, img: BoatC2Img },
                { row: 13, col: 2, img: BoatC2Img },
                { row: 13, col: 4, img: BoatC2Img },
                { row: 9, col: 4, img: BoatC3Img },
                { row: 12, col: 7, img: BoatC3Img },
                { row: 14, col: 2, img: BoatC3Img },
                { row: 9, col: 2, img: BoatC3Img },
                { row: 11, col: 3, img: BoatC3Img },

                { row: 13, col: 15, img: DessertB1Img },
                { row: 11, col: 19, img: DessertB1Img },
                { row: 14, col: 10, img: DessertB1Img },
                { row: 14, col: 12, img: DessertB1Img },
                { row: 8, col: 11, img: DessertB1Img },
                { row: 8, col: 15, img: DessertB2Img },
                { row: 9, col: 18, img: DessertB2Img },
                { row: 12, col: 11, img: DessertB2Img },
                { row: 10, col: 11, img: DessertB2Img },
                { row: 11, col: 13, img: DessertB2Img },
                { row: 12, col: 17, img: DessertB3 },
                { row: 9, col: 19, img: DessertB3 },
                { row: 11, col: 10, img: DessertB3 },
                { row: 12, col: 12, img: DessertB3 },
                { row: 13, col: 14, img: DessertB3 },
                { row: 14, col: 19, img: DessertB3 }
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
                    : rowIndex < map.length / 2 && colIndex >= row.length / 2
                    ? "hexagon4"
                    : rowIndex >= map.length / 2 && colIndex < row.length / 2
                    ? "hexagon3"
                    : "hexagon2") + lastRowHexagon1 + startcowHexagon4
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
                    {hex.cityCenter && (
                      <img
                        src={CityCenImg}
                        className="image"
                        style={{
                          width: `${hexSize * 2}%`,
                          height: `${hexSize * 2}%`,
                          marginTop: `${hexSize * 0.3}%`,
                          marginLeft: `${hexSize * 0.3}%`,
                        }}
                        alt="City Center"
                      />
                    )}
                    {treeImg && (
                      <img
                        src={treeImg}
                        className="image"
                        style={{
                          width: `${hexSize * 1.5}%`,
                          height: `${hexSize * 1.5}%`,
                          marginTop: `${hexSize *0.01}%`,
                          marginLeft: `${hexSize * 0.01}%`,
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
      <div className="mini-map">
        {map.map((row, rowIndex) => (
          <div key={rowIndex} className="mini-map-row">
            {row.map((hex, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="mini-hexagon"
                style={{
                  width: "10px",
                  height: "6px",
                  marginTop: hex.col % 2 === 0 ? "5px" : "1px",
                  backgroundColor: hex.cityCenter ? "red" : "transparent",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Hexagon;
