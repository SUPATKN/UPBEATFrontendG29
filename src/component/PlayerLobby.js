import { useState, useEffect } from "react";
import Button from "./button";

const PlayerLobby = ({
  index,
  playerName,
  handlePlayerReady,
  playerReady,
  Username,
  isHost,
}) => {
  let isReady = playerReady;
  const [Isme, setIsme] = useState(false);

  const handleClick = () => {
    if (Isme) {
      handlePlayerReady(index);
      isReady = playerReady;
    }
  };
  useEffect(() => {
    if (Username === playerName) {
      setIsme(true);
    } else {
      setIsme(false);
    }
  });
  return (
    <div className={Isme ? "PlayerImageMe" : "PlayerImage"}>
      {isHost && <div className="host">Host</div>}
      <div className={isReady ? "Ready" : "Unready"}>
        
      </div>
      <div className={playerReady ? "ReadyStatus" : "UnreadyStatus" }>{playerReady ? "Ready" : "Unready"}</div>
      <div className="PlayerName">{playerName}</div>
    </div>
  );
};

export default PlayerLobby;
