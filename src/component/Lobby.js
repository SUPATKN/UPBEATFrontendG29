import { useParams } from "react-router-dom";
import PlayerLobby from "./PlayerLobby";
import { useState, useEffect } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Lobby = () => {
  const navigate = useNavigate();
  const [allPlayersReady, setAllPlayersReady] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]);
  // Function to track readiness of each player
  const [playerReadiness, setPlayerReadiness] = useState([]);

  const fetchAllPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/allPlayer", {
        headers: {
          "Access-Control-Allow-Origin": "*", // กำหนดค่า Access-Control-Allow-Origin
        },
      });
      console.log(response.data);
      setAllPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe("/topic/gameState", () => fetchAllPlayers());
      client.subscribe("/topic/ready", () => fetchAllPlayers());
    });
    fetchAllPlayers();
    console.log(playerReadiness);
  }, []);

  // Function to handle player readiness
  const handlePlayerReady = async (index) => {
    try {
      const player = allPlayers[index];
      console.log(player.name);
      await axios.post("http://localhost:8080/Ready", player.name, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error setting player ready:", error);
    }
  };

  const CheckAllPlayerReady = () => {
    setPlayerReadiness(new Array(allPlayers.length).fill(allPlayers.ready));
  };

  const startGame = () => {
    if (allPlayersReady) {
      navigate("/");
    }
  };

  return (
    <div className="LobbyBackground">
      <div className="Select">
        {/* Map each player and render PlayerLobby */}
        {allPlayers.map((player, index) => (
          <PlayerLobby
            key={index}
            playerName={player.name}
            handlePlayerReady={() => handlePlayerReady(index)}
            playerReady={player.ready}
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
  );
};

export default Lobby;
