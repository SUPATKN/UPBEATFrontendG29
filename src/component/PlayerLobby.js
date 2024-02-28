import { useState, useEffect } from "react";
import Button from "./button";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const PlayerLobby = ({ index, handlePlayerReady }) => {
  const [isReady, setIsReady] = useState(false);
  const [playerName, setPlayerName] = useState(""); 

  const handleClick = () => {
    setIsReady(!isReady);
    handlePlayerReady(index);
  };

  useEffect(() => {
    const socket = new SockJS(`http://localhost:8080/ws`);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/public", (response) => {
        const player = JSON.parse(response.body);
        if (index === player.index) {
          setPlayerName(player.name);
        }
      });
    });
  }, [index]);

  return (
    <div className="PlayerImage">
      <div className={isReady ? "Ready" : "Unready"}></div>
      <div className="pixel2">{playerName || (index === 0 ? "test" : "")}</div> {/* ถ้า playerName เป็นค่าว่าง ให้ใช้ "test" สำหรับผู้เล่นแรก */}
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