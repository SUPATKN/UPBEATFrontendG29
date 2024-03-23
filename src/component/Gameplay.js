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
      let mePlayer = response.data.find(
        (player) => player.name === name["playername"]
      ); // ค้นหา player ของตัวเอง
      setMe(mePlayer);
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

  return (
    <div className="GameplayBackground">
      <div className="GameplayBorder">
        {PlanClick && (
          <ConfirmPlan
            Plan={Plan}
            setPlan={setPlan}
            handleSubmit={handleSubmit}
          />
        )}
        {/* {console.log(allPlayers[0].crew.position)} */}
        <Hexagon map={Map} allPlayer={allPlayers} Me={MyName} />
        <div className="PlayerInfo">
          <div className="submitBot">
            <button className={"pixel2"} onClick={PlanSubmit}>
              Do same plan
            </button>
            <button className={"pixel2"} onClick={PlanArea}>
              Plan
            </button>
            {GameState && <div>Game turn : {GameState.totalTurn}</div>}
            <br />
            Turn : {whoTurn === MyName ? MyName : whoTurn}
            <br />
            {allInitial
              ? "Game Start!!!"
              : "waiting other player plan initial plan"}
            <br />
            {isAction ? "Doing action..." : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gameplay;
