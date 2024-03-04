import { useState, useEffect } from "react";
import Button from "./button";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
const PlayerLobby = ({ index, playerName, handlePlayerReady, playerReady }) => {
  let isReady = playerReady;

  const handleClick = () => {
    handlePlayerReady(index);
    isReady = playerReady;
  };

  return (
    <div className="PlayerImage">
      <div className={isReady ? "Ready" : "Unready"}></div>

      <Button Title={playerName} />

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
