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
  const [isHost, setHost] = useState(false);
  const [Me, setMe] = useState(null);
  const name = useParams();
  console.log(name["playername"]);

  const fetchAllPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/allPlayer", {
        headers: {
          "Access-Control-Allow-Origin": "*", // กำหนดค่า Access-Control-Allow-Origin
        },
      });
      console.log(response.data);
      setAllPlayers(response.data);
      let mePlayer = response.data.find(
        (player) => player.name === name["playername"]
      ); // ค้นหา player ของตัวเอง
      setMe(mePlayer); // กำหนดค่า Me เป็น player ของตัวเราเอง
      console.log(mePlayer);
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
      client.subscribe("/topic/Allready", () => CheckAllReady());
      client.subscribe("/topic/startgame", () => GoGameplay());
    });
    fetchAllPlayers();
  }, []);

  const CheckAllReady = async () => {
    const response = await axios.get("http://localhost:8080/allReady", {
      headers: {
        "Access-Control-Allow-Origin": "*", // กำหนดค่า Access-Control-Allow-Origin
      },
    });
    console.log(response.data);
    setAllPlayersReady(response.data);
  };

  // Function to handle player readiness
  const handlePlayerReady = async (name) => {
    try {
      const player = allPlayers.find((player) => player.name === name);
      console.log(player.name);
      await axios.put("http://localhost:8080/Ready", player.name, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error setting player ready:", error);
    }
  };
  useEffect(() => {
    findHost();
  });

  const findHost = () => {
    const hostPlayer = allPlayers.find((player) => player.host === true);
    console.log("host ", hostPlayer);
    if (hostPlayer && hostPlayer.name === name["playername"]) {
      console.log("This player is the host");
      setHost(true);
    } else {
      console.log("This player is not the host");
      setHost(false);
    }
  };
  const GoGameplay = () => {
    navigate(`/Gameplay/${name["playername"]}`);
  };

  const startGame = async () => {
    if (allPlayersReady && isHost) {
      try {
        await axios.post("http://localhost:8080/gamestart", name, {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Error adding player:", error);
      }
      GoGameplay();
    }
  };

  return (
    <div className="LobbyBackground">
      <div className="Select">
        {allPlayers
          .sort((a, b) => {
            if (a.name === name["playername"]) return -1; // ถ้าชื่อของผู้เล่นเป็น name["playername"] ให้อยู่ด้านหน้า
            if (b.name === name["playername"]) return 1; // ถ้าชื่อของผู้เล่นเป็น name["playername"] ให้อยู่ด้านหน้า
            return 0;
          })
          .map((player, index) => (
            <PlayerLobby
              key={index}
              playerName={player.name}
              playerReady={player.ready}
              Username={name["playername"]}
              isHost={player.host}
            />
          ))}
      </div>
      {isHost ? (
        <div className="ReadyButton">
          <Button
            Title={Me && Me.ready ? "Unready" : "Ready"}
            handleClick={() => handlePlayerReady(name["playername"])}
          />
        </div>
      ) : (
        <div className="ReadyButton"  style={{ marginTop: "80px" }}>
          <Button
            Title={Me && Me.ready ? "Unready" : "Ready"}
            handleClick={() => handlePlayerReady(name["playername"])}
          />
        </div>
      )}

      {isHost && (
        <div className="StartGame">
          <Button
            Title={"Start Game"}
            handleClick={startGame}
            Ready={allPlayersReady}
          />
        </div>
      )}
    </div>
  );
};

export default Lobby;
