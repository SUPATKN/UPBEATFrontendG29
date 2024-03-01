import { useState, useEffect } from "react";
import Button from "./button";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
const PlayerLobby = ({ index, playerName, handlePlayerReady }) => {
  const [isReady, setIsReady] = useState(false);

  const handleClick = () => {
    setIsReady(!isReady);
    handlePlayerReady(index);
  };

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
