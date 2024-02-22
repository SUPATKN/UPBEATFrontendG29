import { useState } from "react";
import Button from "./button";

const PlayerLobby = ({ index, handlePlayerReady }) => {
  const [isReady, setIsReady] = useState(false);

  const handleClick = () => {
    setIsReady(!isReady);
    handlePlayerReady(index);
  };

  return (
    <div className="PlayerImage">
      <div className={isReady ? "Ready" : "Unready"}></div>
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
