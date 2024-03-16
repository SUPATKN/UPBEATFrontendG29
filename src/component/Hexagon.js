import React, { useState } from "react";
import CityCenImg from "../Image/d2x297b-54f069b5-efef-407c-8bb4-bf81f4b547f4.png";
import CrewImg from "../Image/Knight.png";

const Hexagon = ({ map, allPlayer }) => {
  const [zoomed, setZoomed] = useState(false); // เพิ่ม state เพื่อตรวจสอบสถานะการซูม

  const toggleZoom = () => {
    setZoomed(!zoomed); // สลับสถานะการซูม
  };

  const hexH = 80;
  const hexW = 80;




  const hexSize = zoomed ? 80 : 50; // ปรับขนาดของ hexagon ตามสถานะการซูม

  return (
    <div className="hexagon-col-container">
      {/* เพิ่มกรอบสีขาวแนวตั้งด้านซ้าย */}
      <div className="white-frame">
        {/* เพิ่มการแสดงแผนที่ภายในกรอบ */}
        <div
          className={`map-inside-frame ${zoomed ? "zoomed-in" : "zoomed-out"}`}
          onClick={toggleZoom}
        >
          {map.map((row, rowIndex) => (
            <div key={rowIndex} className="hexagon-row">
              {row.map((hex, colIndex) => {
                const isCrewHere = allPlayer.some(
                  (player) =>
                    player.crew.position.row === hex.row &&
                    player.crew.position.col === hex.col
                );
                // console.log(colIndex);
                const mgL = zoomed ? -15:-10;
                const mgB = zoomed ?-35:-20;
                const marginTop1 = hex.col % 2 === 0 ?90:50;
                const marginTop2 = hex.col % 2 === 0 ?75:50;
                const succ = zoomed ? marginTop1:marginTop2;

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="hexagon"
                    style={{
                      marginLeft: `${mgL}px`,
                      marginBottom: `${mgB}px`,
                      marginTop: `${succ}px`,
                      width: `${hexSize}px`,
                      height: `${hexSize}px`,
                    }}
                  >
                    {`row: ${hex.row}, col: ${hex.col}, cityCenter: ${
                      hex.cityCenter ? "true" : "false"
                    }`}
                    <div className="image-container">
                      {hex.cityCenter && (
                        <img
                          src={CityCenImg}
                          className="image"
                          alt="City Center"
                        />
                      )}
                      {/* {isCrewHere && (
                        <img src={CrewImg} className="image" alt="Crew" />
                      )} */}
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
