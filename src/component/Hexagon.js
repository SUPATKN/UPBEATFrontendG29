  import React, { useState, useRef } from "react";
  import CityCenImg from "../Image/cityCenter.png";
  import CrewImg from "../Image/Knight.png";
  import TreeA1Img from "../Image/treeA1.png";
  import TreeA2Img from "../Image/treeA2.png";
  import TreeA3Img from "../Image/treeA3.png";
  import DessertB1Img from "../Image/desertC1.png";
  import DessertB2Img from "../Image/desertC2.png";
  import DessertB3 from "../Image/desertC3.png";
  import BoatC1Img from "../Image/boatB1.png";
  import BoatC2Img  from "../Image/boatB2.png";
  import BoatC3Img  from "../Image/boatB3.png";
  import GreyD1Img from "../Image/greyD1.png";
  import GreyD2Img  from "../Image/greyD2.png";
  import GreyD3Img  from "../Image/greyD3.png";
  import City1 from "../Image/city1.png"
  import City2 from "../Image/city2.png"
  import City3 from "../Image/city3.png"
  import bg  from "../Image/BlGVAfgCEAAOv7V.png";
  import "./Hexagon.css";
  import HexRed from "../Image/hexRed.png"
  import Crew from "../Image/pngtree-viking-cartoon-character-sprite-sheet-animation-for-2d-rpg-game-png-image_6328460.png"
  import HexRed from "../Image/hexRed.png"
  import Crew from "../Image/pngtree-viking-cartoon-character-sprite-sheet-animation-for-2d-rpg-game-png-image_6328460.png"

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
    <div className="hexagon-map-container"
      style={{
        width: "765px",
        height: "500px",
        marginTop: "14px",
        border: "6px solid  #434343",
        overflow: "hidden"
      }}
    >
      <div
        ref={containerRef}
        style={{ overflow: "hidden",}}
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
      >
        <div
          className="main-map"
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


                //oddodd no d
                //oddeven have d
                //eveneven have d
                //evenodd no d

                //r:even c:even have d (1,2,1)
                //r:even c:odd no d (1,1,1)
                //r:odd c:odd  no d (2,1,1)
                //r:odd c:even have d (2,2,2)

                let lastRowHexagon1I0 = "";
                let lastRowHexagon1I1 = "";
                let startcowHexagon3 = "";
                let startcowHexagon4 = "";
                // console.log(rowIndex , colIndex);
                console.log(map.length,map[1].length);

                if((map.length%2 === 0) && (map[1].length%2 === 0)){
                  //case1
                  lastRowHexagon1I0 = (rowIndex === Math.floor(map.length / 2)-1   && colIndex %2 === 0 )? " hexagon1I0" : "";
                  lastRowHexagon1I1 = (rowIndex === Math.floor(map.length / 2)-1   && colIndex %2 !== 0 )? " hexagon1I1" : "";
    
                  startcowHexagon3 = (colIndex === Math.floor(map[1].length / 2))  ? " hexagon3I" : "";

                }else if((map.length%2 === 0) && (map[1].length%2 !== 0)){
                  //case2
                  lastRowHexagon1I0 = (rowIndex === Math.floor(map.length / 2)-1   && colIndex %2 === 0 )? " hexagon1I0" : "";
                  lastRowHexagon1I1 = (rowIndex === Math.floor(map.length / 2)-1   && colIndex %2 !== 0 )? " hexagon1I1" : "";
      
                  startcowHexagon3 = (colIndex === (Math.floor(map[1].length / 2) +1 ) && rowIndex>=map.length/2)  ? " hexagon3I" : "";
  
                }else if((map.length%2 !== 0) && (map[1].length%2 !== 0)){
                  //case3
                  lastRowHexagon1I0 = (rowIndex === Math.floor(map.length / 2)   && colIndex %2 === 0 )? " hexagon1I0" : "";
                  lastRowHexagon1I1 = (rowIndex === Math.floor(map.length / 2)   && colIndex %2 !== 0 )? " hexagon1I1" : "";

                  startcowHexagon3 = (colIndex === (Math.floor(map[1].length / 2) +1 ) && rowIndex>=map.length/2)  ? " hexagon3I" : "";

                }else if((map.length%2 !== 0) && (map[1].length%2 === 0)){
                  //case4
                  lastRowHexagon1I0 = (rowIndex === Math.floor(map.length / 2)   && colIndex %2 === 0 )? " hexagon1I0" : "";
                  lastRowHexagon1I1 = (rowIndex === Math.floor(map.length / 2)   && colIndex %2 !== 0 )? " hexagon1I1" : "";
      
                  startcowHexagon3 = (colIndex === (Math.floor(map[1].length / 2)  ) && rowIndex>=map.length/2)  ? " hexagon3I" : "";
                } 

                const treeMap = [
                  // TreeA1 * 5
                  { row: 0, col: 0, img: TreeA1Img },
                  { row: 0, col: 1, img: TreeA1Img },
                  { row: 0, col: 2, img: TreeA1Img },
                  { row: 0, col: 3, img: TreeA1Img },
                  { row: 0, col: 4, img: TreeA1Img },
                  { row: 0, col: 5, img: TreeA1Img },
                  
                  { row: 4, col: 0, img: TreeA1Img },
                  { row: 3, col: 0, img: TreeA1Img },
                  { row: 2, col: 0, img: TreeA1Img },
                  { row: 1, col: 0, img: TreeA1Img },
                  { row: 1, col: 1, img: TreeA1Img },
                  { row: 2, col: 1, img: TreeA1Img },
                  { row: 3, col: 1, img: TreeA1Img },
                  { row: 1, col: 2, img: TreeA1Img },
                  { row: 1, col: 3, img: TreeA1Img },

                  // TreeA2 * 5
                  { row: 5, col: 0, img: TreeA2Img },
                  { row: 6, col: 0, img: TreeA2Img },
                  { row: 5, col: 1, img: TreeA2Img },
                  { row: 2, col: 2, img: TreeA2Img },
                  { row: 2, col: 3, img: TreeA2Img },
                  { row: 0, col: 6, img: TreeA2Img },                
                  { row: 0, col: 7, img: TreeA2Img },

                  { row: 1, col: 4, img: TreeA2Img },                
                  { row: 1, col: 5, img: TreeA2Img },
                  { row: 3, col: 2, img: TreeA2Img },
                  { row: 3, col: 1, img: TreeA2Img },
                  { row: 4, col: 1, img: TreeA2Img },
                
                  // TreeA3 * 5
                  { row: 4, col: 2, img: TreeA3Img },
                  { row: 4, col: 3, img: TreeA3Img },
                  { row: 3, col: 3, img: TreeA3Img },
                  { row: 2, col: 4, img: TreeA3Img },
                
                  // BoatC1 * 5
                  { row: 14, col: 0, img: BoatC1Img },
                  { row: 15, col: 0, img: BoatC1Img },
                  { row: 16, col: 0, img: BoatC1Img },
                  { row: 17, col: 0, img: BoatC1Img },
                  { row: 17, col: 1, img: BoatC1Img },
                  { row: 18, col: 2, img: BoatC1Img },
                  { row: 18, col: 0, img: BoatC1Img },
                  { row: 18, col: 1, img: BoatC1Img },

                  { row: 19, col: 0, img: BoatC1Img },
                  { row: 19, col: 1, img: BoatC1Img },
                  { row: 19, col: 2, img: BoatC1Img },
                  { row: 19, col: 3, img: BoatC1Img },
                  { row: 19, col: 4, img: BoatC1Img },
                  { row: 19, col: 5, img: BoatC1Img },
                  { row: 19, col: 6, img: BoatC1Img },

                
                  // BoatC2 * 5
                  { row: 17, col: 3, img: BoatC2Img },
                  { row: 17, col: 4, img: BoatC2Img },
                  { row: 16, col: 3, img: BoatC2Img },
                  { row: 15, col: 2, img: BoatC2Img },
                
                  // BoatC3 * 5
                  { row: 13, col: 0, img: BoatC3Img },
                  { row: 12, col: 0, img: BoatC3Img },
                  { row: 14, col: 1, img: BoatC3Img },
                  { row: 15, col: 1, img: BoatC3Img },
                  { row: 16, col: 1, img: BoatC3Img },
                  { row: 16, col: 2, img: BoatC3Img },
                  { row: 17, col: 2 , img: BoatC3Img },
                  { row: 18, col: 3, img: BoatC3Img },
                  { row: 18, col: 4, img: BoatC3Img },
                  { row: 18, col: 5, img: BoatC3Img },
                  { row: 18, col: 6, img: BoatC3Img },
                  { row: 19, col: 7, img: BoatC3Img },
                  { row: 19, col: 8, img: BoatC3Img },


                  // DessertB1 * 5
                    { row: 19, col: 14, img: DessertB1Img },
                  { row: 19, col: 15, img: DessertB1Img },
                  { row: 19, col: 16, img: DessertB1Img },
                  { row: 19, col: 17, img: DessertB1Img },
                  { row: 19, col: 18, img: DessertB1Img },
                  { row: 18, col: 18, img: DessertB1Img },
                  { row: 17, col: 18, img: DessertB1Img },
                  { row: 16, col: 18, img: DessertB1Img },
                  { row: 15, col: 18, img: DessertB1Img },

                  { row: 18, col: 17, img: DessertB1Img },
                  { row: 18, col: 16, img: DessertB1Img },
                  { row: 14, col: 19, img: DessertB1Img },
                  { row: 15, col: 19, img: DessertB1Img },
                  { row: 16, col: 19, img: DessertB1Img },
                  { row: 17, col: 19, img: DessertB1Img },
                  { row: 18, col: 19, img: DessertB1Img },
                  { row: 19, col: 19, img: DessertB1Img },

                
                  // DessertB2 * 5
                  { row: 17, col: 14, img: DessertB2Img },
                  { row: 17, col: 15, img: DessertB2Img },
                  { row: 16, col: 16, img: DessertB2Img },
                  { row: 15, col: 16, img: DessertB2Img },
                  
                
                  // DessertB3 * 5
                  
                  { row: 19, col: 12, img: DessertB3 },
                  { row: 19, col: 13, img: DessertB3 },
                  { row: 18, col: 14, img: DessertB3 },
                  { row: 18, col: 15, img: DessertB3 },
                  { row: 17, col: 16, img: DessertB3 },
                  { row: 17, col: 17, img: DessertB3 },
                  { row: 16, col: 17, img: DessertB3 },
                  { row: 15, col: 17, img: DessertB3 },
                  { row: 14, col: 18, img: DessertB3 },
                  { row: 13, col: 18, img: DessertB3 },
                  { row: 13, col: 19, img: DessertB3 },
                  { row: 12, col: 19, img: DessertB3 },
                
                  // GreyD1 * 5
                  { row: 0, col: 13, img: GreyD1Img },
                  { row: 0, col: 14, img: GreyD1Img },
                  { row: 0, col: 15, img: GreyD1Img },
                  { row: 0, col: 16, img: GreyD1Img },
                  { row: 0, col: 17, img: GreyD1Img },
                  { row: 0, col: 18, img: GreyD1Img },
                  { row: 0, col: 19, img: GreyD1Img },
                  { row: 1, col: 18, img: GreyD1Img },
                  { row: 2, col: 18, img: GreyD1Img },
                  { row: 3, col: 18, img: GreyD1Img },
                  { row: 1, col: 17, img: GreyD1Img },
                  { row: 2, col: 17, img: GreyD1Img },
                  
                  { row: 1, col: 19, img: GreyD1Img },
                  { row: 2, col: 19, img: GreyD1Img },
                  { row: 3, col: 19, img: GreyD1Img },
                  { row: 4, col: 19, img: GreyD1Img },
                  { row: 5, col: 19, img: GreyD1Img },

                  // GreyD2 * 5
                  { row: 2, col: 16, img: GreyD2Img },
                  { row: 2, col: 15, img: GreyD2Img },
                  { row: 3, col: 16, img: GreyD2Img },
                  { row: 4, col: 16, img: GreyD2Img },
                  { row: 5, col: 17, img: GreyD2Img },
                
                  // GreyD3 * 5
                  { row: 0, col: 11, img: GreyD3Img },
                  { row: 0, col: 12, img: GreyD3Img },
                  { row: 1, col: 13, img: GreyD3Img },
                  { row: 1, col: 14, img: GreyD3Img },
                  { row: 1, col: 15, img: GreyD3Img },
                  { row: 1, col: 16, img: GreyD3Img },
                  { row: 2, col: 16, img: GreyD3Img },
                  { row: 3, col: 17, img: GreyD3Img },
                  { row: 4, col: 17, img: GreyD3Img },
                  { row: 4, col: 18, img: GreyD3Img },
                  { row: 5, col: 18, img: GreyD3Img },
                  { row: 6, col: 19, img: GreyD3Img },
                  { row: 7, col: 19, img: GreyD3Img },
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
                      ? "hexagon2"
                      : "hexagon3") 
                      + startcowHexagon4 + lastRowHexagon1I0 + lastRowHexagon1I1  + startcowHexagon3 
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
                      {hex.deposit.currentdep >=1 && !hex.cityCenter &&!treeImg&&(
                        <img
                          src={City2}
                          className="image"
                          style={{
                            width: `${hexSize * 0.8}%`,
                            height: `${hexSize * 0.8}%`,
                            marginTop: `${hexSize * 0.2}%`,
                            marginLeft: `${hexSize * 0.3}%`,
                          }}
                        />
                      )}
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
                            width: `${hexSize*1}%`,
                            height: `${hexSize*1.9}%`,
                            marginTop: `${hexSize *-0.85}%`,
                            marginLeft: `${hexSize *0.1}%`,
                          }}
                          alt="City Center"
                        />
                      )}
                      {isCrewHere && <img src={Crew} className="image" />}
                      {treeImg && !hex.cityCenter &&(
                        <img
                          src={treeImg}
                          className="image"
                          style={{
                            width: `${hexSize * 1.1}%`,
                            height: `${hexSize * 1.1}%`,
                            marginTop: `${hexSize *0.1}%`,
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
