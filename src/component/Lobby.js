import { useParams } from "react-router-dom";
import PlayerLobby from "./PlayerLobby";
import { useState } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const { numberOfPlayers } = useParams();
  const num = parseInt(numberOfPlayers);
  const navigate = useNavigate();
  const [allPlayersReady, setAllPlayersReady] = useState(false);

  // Function to track readiness of each player
  const [playerReadiness, setPlayerReadiness] = useState(
    Array.from({ length: num }, () => false)
  );

  // Function to handle player readiness
  const handlePlayerReady = (index) => {
    const updatedReadiness = [...playerReadiness];
    updatedReadiness[index] = !updatedReadiness[index];
    setPlayerReadiness(updatedReadiness);

    // Check if all players are ready
    const allReady = updatedReadiness.every((ready) => ready);
    setAllPlayersReady(allReady);
  };

  const startGame = () => {
    if (allPlayersReady) {
      navigate("/");
    }
  };

  return (
    <div className="LobbyBackground">
      <div>
        <div className="Select">
          {Array.from({ length: num }, (_, index) => (
            <PlayerLobby
              key={index}
              index={index}
              handlePlayerReady={handlePlayerReady}
            />
          ))}
        </div>
        <div className="StartGame">
          <Button
            Title={"Start Game"}
            handleClick={startGame}
            Ready={allPlayersReady}
          />
        </div>
      </div>
    </div>
  );
};

export default Lobby;
