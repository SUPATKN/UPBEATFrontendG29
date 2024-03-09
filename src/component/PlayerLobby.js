import { useState, useEffect } from "react";
import Button from "./button";

const PlayerLobby = ({
  index,
  playerName,
  handlePlayerReady,
  playerReady,
  Username,
}) => {
  let isReady = playerReady;
  console.log(playerName);
  console.log(Username);
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
  console.log(Username);
  console.log(Isme);
  return (
    <div className={Isme ? "PlayerImageMe" : "PlayerImage"}>
      <div className={isReady ? "Ready" : "Unready"}></div>

      <Button Title={playerName} />

      <div className="ReadyButton">
        <Button
          Title={isReady ? "Unready" : "Ready"}
          handleClick={handleClick}
          Ready={isReady}
        />
      </div>
    </div>
  );
};

export default PlayerLobby;
