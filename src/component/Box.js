import { useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useNavigate } from "react-router-dom";
const Box = ({ numberOfPlayers }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const socket = new SockJS(`http://localhost:8080/ws`);
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        stompClient.subscribe("/topic/public");
        stompClient.send("/app/addPlayer", {}, name);
        navigate(`/Lobby/${numberOfPlayers}`);
      },
      (error) => {
        console.error("WebSocket connection error", error);
      }
    );
  };

  return (
    <div>
      <label>
        Enter your name:
        <input
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
