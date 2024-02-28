import { useState, useEffect } from "react";
import Button from "./button";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
const PlayerLobby = ({ index, handlePlayerReady }) => {
  const [isReady, setIsReady] = useState(false);

  const handleClick = () => {
    setIsReady(!isReady);
    handlePlayerReady(index);
  };
  const [playerName, setPlayerName] = useState("test");

  useEffect(() => {
    const socket = new SockJS(`http://localhost:8080/ws`);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/public", (response) => {
        const player = JSON.parse(response.body);
        setPlayerName(player.name); // นำข้อมูล player ไปแสดงใน UI
      });
    });
  }, []);

  return (
    <div className="PlayerImage">
      <div className={isReady ? "Ready" : "Unready"}></div>
      <div className="pixel2">{playerName}</div>
      <div className="ReadyButton">
        <Button
          Title={isReady ? "Unready" : "Ready"}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default PlayerLobby;
