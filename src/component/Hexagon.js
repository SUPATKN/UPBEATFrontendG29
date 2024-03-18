import React, { useState, useRef } from "react";
import CityCenImg from "../Image/d2x297b-54f069b5-efef-407c-8bb4-bf81f4b547f4.png";
import CrewImg from "../Image/Knight.png";
import "./Hexagon.css";

const Hexagon = ({ map, allPlayer }) => {
  const [zoomed, setZoomed] = useState(false); // เพิ่ม state เพื่อตรวจสอบสถานะการซูม
  const [hexSize, setHexSize] = useState(50); // เพิ่ม state เพื่อเก็บขนาดของ hexagon
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const containerRef = useRef(null);

  const toggleZoom = () => {
    setZoomed(!zoomed); // สลับสถานะการซูม
    setHexSize(zoomed ? 50 : 80); // อัพเดตขนาดของ hexagon ตามสถานะการซูม
  };

  const handleSlide = (e) => {
    const newSize = parseInt(e.target.value);
    setHexSize(newSize); // อัพเดตขนาดของ hexagon ตามค่าที่เลื่อน
  };

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
    <div className="hexagon-col-container">
      {/* เพิ่มกรอบสีขาวแนวตั้งด้านซ้าย */}
      <div className="white-frame">
        {/* เพิ่มการแสดงแผนที่ภายในกรอบ */}
        <div
          ref={containerRef}
          className={`map-inside-frame ${zoomed ? "zoomed-in" : "zoomed-out"}`}
          onWheel={(e) => {
            e.preventDefault(); // ป้องกันการเลื่อนหน้าเว็บในกรณีที่มีการซูมด้วยการใช้เมาส์เลื่อน
            if (e.deltaY > 0 && hexSize > 50) {
              setHexSize(hexSize - 5); // ลดขนาดของ hexagon เมื่อซูมออก
            } else if (e.deltaY < 0 && hexSize < 80) {
              setHexSize(hexSize + 5); // เพิ่มขนาดของ hexagon เมื่อซูมเข้า
            }
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="hexagon-map-container">
            <div className="main-map">
              {map.map((row, rowIndex) => (
                <div key={rowIndex} className="hexagon-row">
                  {row.map((hex, colIndex) => {
                    const isCrewHere = allPlayer.some(
                      (player) =>
                        player.crew.position.row === hex.row &&
                        player.crew.position.col === hex.col
                    );
                    const mgL = zoomed ? -15 : -10;
                    const mgB = zoomed ? -35 : -20;
                    const marginTop1 = hex.col % 2 === 0 ? 90 : 50;
                    const marginTop2 = hex.col % 2 === 0 ? 75 : 50;
                    const succ = zoomed ? marginTop1 : marginTop2;

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
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            {/* เพิ่มมินิแมพ */}
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
      </div>
      {/* เพิ่มแถบ slidebar */}
      <div className="slider-container" style={{ marginTop: "10px", marginLeft: "-1130px" }}>
        <button onClick={() => setHexSize(hexSize - 5)}>-</button>
        <input
          type="range"
          min="50"
          max="80"
          step="5"
          value={hexSize}
          onChange={handleSlide}
          className="slider"
          style={{ backgroundColor: "white", flexGrow: 1 }}
        />
        <button onClick={() => setHexSize(hexSize + 5)}>+</button>
      </div>
    </div>
  );
};

export default Hexagon;
