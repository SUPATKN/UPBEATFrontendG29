import { useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Box = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      console.log(name);

      // ส่งชื่อผู้เล่นไปยัง backend โดยใช้ HTTP POST request
      const response = await axios.post(
        "http://localhost:8080/addplayer",
        name,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // หากสำเร็จ จะทำตามขั้นตอนที่ต้องการ เช่น นำผู้เล่นไปยังหน้าต่อไป
      console.log("Player added:", response.data);

      // ส่งผู้ใช้ไปยังหน้าต่อไป ตามตัวอย่างนี้เป็นการใช้ react-router-dom
      // คุณอาจใช้วิธีอื่น ๆ ตามที่ต้องการ
      // navigate("/next-page");
      navigate(`/Lobby/${name}`);
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  return (
    <div>
      <label>
        Enter your name:
        <input
          className=""
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Box;
