import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [intMin, setIntMin] = useState(5);
const [intSec, setIntSec] = useState(0);
const [revMin, setRevMin] = useState(0);
const [revSec, setRevSec] = useState(0);
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


  const AlertLose = () => {
      alert("Some Player Lose") 
      fetchAllPlayers()
      fetchGameState()
  }


  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe("/topic/updateMap", () => fetchMap());
      client.subscribe("/topic/updateMap", () => fetchAllPlayers());
      client.subscribe("/topic/initial", () => CheckAllInitial());
      client.subscribe("/topic/nextPlayerTurn", () => fetchGameState());
      client.subscribe("/topic/playerLose", () => AlertLose());
    });
    fetchAllPlayers();
    fetchMap();
    fetchGameState();
    if(GameState){
      setIntMin(GameState.init_plan_min)
      setIntSec(GameState.init_plan_sec)
      setRevMin(GameState.plan_rev_min)
      setRevSec(GameState.plan_rev_sec) 
    }
      
    
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
      let intMin = response.data.init_plan_min
      let intSec = response.data.init_plan_sec
      let RevMin = response.data.plan_rev_min
      let RevSec = response.data.plan_rev_sec
      setIntMin(GameState.init_plan_min)
      setIntSec(GameState.init_plan_sec)
      setRevMin(GameState.plan_rev_min)
      setRevSec(GameState.plan_rev_sec) 

      setIntMin(response.data.init_plan_min)
      setIntSec(response.data.init_plan_sec)
      setRevMin(GameState.plan_rev_min)
      setRevSec(GameState.plan_rev_sec) 
      
      

    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  // useEffect(() => {
  //   if (allInitial) {
  //     DoPlan();
  //   }
  // }, [allInitial]);

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



  return (
    <div className="Gameplay">

      /*----------- TOP SECTION -----------*/
      <div className="GameplayBackground-top">

        <div className="font PlayerStatusIn GameplayBackground-top-name" id="player_name">
          PLAYER NAME : <span id="playername">{Me && Me.name}</span>
        </div>

        <div className="font GameplayBackground-top-turn">
       
          <div className="PlayerStatusIn" > {GameState && <div> GAME TURN : {GameState.totalTurn}</div>}</div>
          {whoTurn === MyName ? <div className="PlayerStatusIn MyTurn">MY TURN</div> : <div className="PlayerStatusIn OtherTurn">OTHER PLAYER TURN | TURN : {whoTurn} </div>}
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
                intMin={intMin}
                intSec={intSec}
                initial={allInitial}
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
                

                <div className="font Gamestate">
                    {GameState && GameState.totalTurn < 2  && <div>
                      {allInitial 
                      ? "[ GAME START ]"
                      : "PLANNING INITIAL PLAN ..."}
                      </div>}
                    <br />
                    
                    {allInitial && <div>
                    {isAction ? "[ DOING ACTION ... ]" : ""}
                    </div>}
                  </div>

                <div className="submitBot-Gameplay PicSword">
                  <button className={"pixel2"} onClick={PlanSubmit}>
                   RUN PLAN<image x></image>
                  </button>
                    
                  <button className={"pixel2 "} onClick={PlanArea}>
                    CHANGE PLAN
                  </button>
                  
                </div>
              </div>

              <div>
                <div id="budget">
                  <div className="font PlayerStatusIn PicCoin" id="budget-value">
                    {" "}
                    <image c></image> BUDGET : {Me && Me.budget}
                  </div>
                </div>

                <div id="citycenter">
                  <div className="font PlayerStatusIn PicCity" id="citycenter">
                    {" "}
                    <image c></image> CITY CENTER : {Me && Me.cityCenter.row + 1} ,{" "}
                    {Me && Me.cityCenter.col + 1}{" "}
                  </div>
                </div>

                <div id="totolRegion">
                  <div className="font PlayerStatusIn PicRegion" id="xp-value">
                  <image c></image> TOTOL REGION : {Me && Me.totolRegion}{" "}
                  </div>
                </div>

              </div>
              </div>
            </div>
        </div>
      </div>

      /*----------- FOOTER SECTION -----------*/
      <div className="GameplayBackground-bottom">
        <div className="font PlayerStatusOP">
        {allPlayers
          .filter(player => player.name !== MyName)
          .map((player) => (
            <span className="opponent-player">
              <image u></image> OPPONENT: {player.name}
              <br />
            </span>
          ))} 
        </div>

      </div>
    </div>
  );
};

export default Gameplay;
