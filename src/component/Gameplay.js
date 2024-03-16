import { useParams } from "react-router-dom";
import PlayerLobby from "./PlayerLobby";
import { useState, useEffect } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Hexagon from "./Hexagon";
const Gameplay = () => {
  const [Map, setMap] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);

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

    client.connect({}, () => {});
    fetchAllPlayers();
  }, []);

  const fetchMap = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getMap", {
        headers: {
          "Access-Control-Allow-Origin": "*", // กำหนดค่า Access-Control-Allow-Origin
        },
      });
      console.log(response.data);
      setMap(response.data.cells);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };
  useEffect(() => {
    fetchMap();
    console.log(Map);
  }, []);

  return (
    <div className="GameplayBackground">
      <div className="GameplayBorder">
        {/* {console.log(allPlayers[0].crew.position)} */}
        <Hexagon map={Map} allPlayer={allPlayers} />
      </div>
    </div>
  );
};

export default Gameplay;
