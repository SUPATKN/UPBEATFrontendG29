import { useParams } from "react-router-dom";
import PlayerLobby from "./PlayerLobby";
import { useState, useEffect } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Lobby = () => {
  const { numberOfPlayers } = useParams();
  const num = parseInt(numberOfPlayers);
  const navigate = useNavigate();
  const [allPlayersReady, setAllPlayersReady] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/allPlayer");
        setAllPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchAllPlayers();
  }, []);

  // Function to track readiness of each player
  const [playerReadiness, setPlayerReadiness] = useState(
    new Array(allPlayers.length).fill(false)
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
          {/* Map each player and render PlayerLobby */}
          {allPlayers.map((player, index) => (
            <PlayerLobby
              key={index}
              playerName={player.name}
              handlePlayerReady={() => handlePlayerReady(index)}
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
