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
      const response = await axios.post(
        "http://localhost:8080/addplayer",
        name,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Player added:", response.data);
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
