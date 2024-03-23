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
  const [Plan, setPlan] = useState("");
  const [Me, setMe] = useState(null);
  const name = useParams();
  const MyName = name["name"];
  console.log(name["name"]);
  const handleSubmit = async () => {
    try {
      console.log(Plan);
      const response = await axios.put(
        "http://localhost:8080/Plan",
        { name: MyName, plan: Plan },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error adding player:", error);
    }
    console.log(Plan);
  };

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
        (player) => player.name === MyName
      ); // ค้นหา player ของตัวเอง
      setMe(mePlayer); 
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe("/topic/updateMap", () => fetchMap());
      client.subscribe("/topic/updateMap", () => fetchAllPlayers());
    });
    console.log("Im in");
    fetchAllPlayers();
    fetchMap();
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

  function countdown(seconds) {
    const startTime = Date.now();
    const endTime = startTime + (seconds * 1000); // Convert seconds to milliseconds
  
    function updateTimer() {
      const remainingTime = endTime - Date.now();
  
      if (remainingTime <= 0) {
        // Time's up!
        clearInterval(interval);
        console.log("Countdown finished!");
        return;
      }
  
      const minutes = Math.floor(remainingTime / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
  
      // Ensure the timer element exists before updating its content
      const timerElement = document.getElementById("timer");
      if (timerElement) {
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      } else {
        console.error("Timer element with ID 'timer' not found!");
      }
    }
  
    const interval = setInterval(updateTimer, 1000); // Update every second
  }
  
  // Example usage: Start a 15-second countdown
  countdown(300);
  

  return (
    <div className="GameplayBackground">
      <div className="GameplayBorder">
        {/* {console.log(allPlayers[0].crew.position)} */}
        <Hexagon map={Map} allPlayer={allPlayers} />
        <div className="PlayerInfo">

          <div className="PlayerStatus">
            <div className="font PlayerStatusIn" id="player_name">
              PLAYER NAME : <span id="playername">{Me && Me.name}</span>
            </div>
            
            <div class="font PlayerStatusIn">
              COUNTDOWN TIME: <span id="timer"></span>
            </div>
          </div>

          <br></br>
          <textarea
            className={" inputCus"}
            type="text"
            value={Plan}
            onChange={(e) => setPlan(e.target.value)}
          />
          <div className="submitBot">
            <button className={"pixel2 "} onClick={handleSubmit}>
              Submit
            </button>
          </div>

          <div className="PlayerStatus">
              <div id="budget">
                <div className="font PlayerStatusIn" id="budget-value"> BUDGET : {Me && Me.budget}</div>
              </div>

              <div id="citycenter">
                <div className="font PlayerStatusIn" id="citycenter"> CITY CENTER : {Me && Me.cityCenter.row+1} , {Me && Me.cityCenter.col+1} </div>
              </div>

              <div id="totolRegion">
                <div className="font PlayerStatusIn" id="xp-value">TOTOL REGION : {Me && Me.totolRegion} </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gameplay;
