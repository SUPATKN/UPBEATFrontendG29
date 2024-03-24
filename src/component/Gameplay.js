import { useParams } from "react-router-dom";
import PlayerLobby from "./PlayerLobby";
import { useState, useEffect } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Hexagon from "./Hexagon";
import ConfirmPlan from "./ConfirmPlan";
const Gameplay = () => {
  const [Map, setMap] = useState([]);
  const [GameState, setGamestate] = useState();
  const [allPlayers, setAllPlayers] = useState([]);
  const [Plan, setPlan] = useState("");
  const [initialPlan, setInitialPlan] = useState(false);
  const [allInitial, setAllInitial] = useState(false);
  const [whoTurn, setWhoTurn] = useState(null);
  const [PlanClick, setPlanClick] = useState(true);
  const [isAction, setisAction] = useState(false);
  const [Me, setMe] = useState(null);
  const name = useParams();
  const MyName = name["name"];
  console.log(name["name"]);

  const PlanSubmit = () => {
    if (allInitial) {
      if (whoTurn === MyName) {
        DoPlan();
        setisAction(true);
      }
    }
  };

  const PlanArea = () => {
    setPlanClick(!PlanClick);
    console.log("Plan Click : ", PlanClick);
  };

  const handleSubmit = async () => {
    if (!initialPlan) {
      try {
        console.log(Plan);
        await axios.put(
          "http://localhost:8080/Plan",
          { name: MyName, plan: Plan },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        await axios.put("http://localhost:8080/InitialPlan", MyName, {
          headers: { "Content-Type": "application/json" },
        });
        setInitialPlan(true);
      } catch (error) {
        console.error("Error adding player:", error);
      }
      console.log(Plan);
    } else {
      if (whoTurn === MyName) {
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
      }
    }
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
      let mePlayer = response.data.find((player) => player.name === MyName); // ค้นหา player ของตัวเอง
      console.log(mePlayer);
      setMe(mePlayer);
      console.log(Me);
      CheckAllInitial();
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
      client.subscribe("/topic/initial", () => CheckAllInitial());
      client.subscribe("/topic/nextPlayerTurn", () => fetchGameState());
    });
    fetchAllPlayers();
    fetchMap();
    fetchGameState();
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

  const fetchGameState = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getGameState", {
        headers: {
          "Access-Control-Allow-Origin": "*", // กำหนดค่า Access-Control-Allow-Origin
        },
      });
      console.log(response.data);
      setGamestate(response.data);
      let turn = response.data.turn.name;
      setWhoTurn(turn);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    if (allInitial) {
      DoPlan();
    }
  }, [allInitial]);

  useEffect(() => {
    setisAction(false);
  }, [whoTurn]);

  const CheckAllInitial = async () => {
    const response = await axios.get("http://localhost:8080/allInitialPlan", {
      headers: {
        "Access-Control-Allow-Origin": "*", // กำหนดค่า Access-Control-Allow-Origin
      },
    });
    console.log(response.data);
    setAllInitial(response.data);
  };

  const DoPlan = async () => {
    if ((whoTurn && whoTurn) === MyName) {
      const response = await axios.put(
        "http://localhost:8080/ParsePlan",
        MyName,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log(MyName);
  };

  useEffect(() => {
    fetchMap();
    fetchGameState();
    console.log(Map);
  }, []);

  function countdown(seconds) {
    const startTime = Date.now();
    const endTime = startTime + seconds * 1000; // Convert seconds to milliseconds

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
        timerElement.textContent = `${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`;
      } else {
        console.error("Timer element with ID 'timer' not found!");
      }
    }

    const interval = setInterval(updateTimer, 1000); // Update every second
  }

  // Example usage: Start a 15-second countdown
  countdown(300);

  return (
    <div className="Gameplay">

      /*----------- TOP SECTION -----------*/
      <div className="GameplayBackground-top">

        <div className="font PlayerStatusIn GameplayBackground-top-name" id="player_name">
          PLAYER NAME : <span id="playername">{Me && Me.name}</span>
        </div>

        <div className="font GameplayBackground-top-turn">
          <div className="PlayerStatusIn" > {GameState && <div> GAME TURN : {GameState.totalTurn}</div>}</div>
          <div className="PlayerStatusIn" >TURN : {whoTurn === MyName ? MyName : whoTurn}</div>
        </div>

      </div>

      /*----------- MAIN SECTION -----------*/
      <div className="Gameplay-Main">

        <div className="GameplayBackground-left">
          <div className="Plan">
            {PlanClick && (
              <ConfirmPlan
                Plan={Plan}
                setPlan={setPlan}
                handleSubmit={handleSubmit}
                click={PlanArea}
              />
            )}
          </div>
          
          <Hexagon map={Map} allPlayer={allPlayers} Me={MyName} />        
        </div>
          

        <div className="GameplayBackground-right">
          <div>
            <div className="PlayerStatus">
              <div className="PlayerStatusIn" >
                <div className="mini-map">
                  {Map.map((row, rowIndex) => (
                    <div key={rowIndex} className="mini-map-row">
                      {row.map((hex, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="mini-hexagon"
                          style={{
                            width:" 8px",
                            height: "8px",
                            marginTop: hex.col % 2 === 0 ? "5px" : "1px",
                            backgroundColor:
                              hex.whoBelongName === MyName
                                ? "red"
                                : "transparent",
                          }}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="submitBot-Gameplay ">
                  <button className={"pixel2"} onClick={PlanSubmit}>
                    RUN PLAN
                  </button>
                  <button className={"pixel2"} onClick={PlanArea}>
                    CHANGE PLAN
                  </button>
                
                  
                  {allInitial
                    ? "Game Start!!!"
                    : "waiting other player plan initial plan"}
                  <br />
                  {isAction ? "Doing action..." : ""}
                </div>
              </div>

              <div>
                <div id="budget">
                  <div className="font PlayerStatusIn" id="budget-value">
                    {" "}
                    BUDGET : {Me && Me.budget}
                  </div>
                </div>

                <div id="citycenter">
                  <div className="font PlayerStatusIn" id="citycenter">
                    {" "}
                    CITY CENTER : {Me && Me.cityCenter.row + 1} ,{" "}
                    {Me && Me.cityCenter.col + 1}{" "}
                  </div>
                </div>

                <div id="totolRegion">
                  <div className="font PlayerStatusIn" id="xp-value">
                    TOTOL REGION : {Me && Me.totolRegion}{" "}
                  </div>
                </div>

              </div>
              </div>
            </div>
        </div>
      </div>
      <div className="GameplayBackground-bottom"></div>
    </div>
  );
};

export default Gameplay;
