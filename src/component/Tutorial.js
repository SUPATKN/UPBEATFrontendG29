import { useEffect, useState } from "react";
import Button from "./button";
import UBEATTitle from "./UBEATTitle";
import { useNavigate } from "react-router-dom";
import Box from "./Box";
const Tutorial = () => {
  const [Back, setBack] = useState(false);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/`);
  };

  return (
    <div className="TuBackground">
      <div className="TutorialBoard">
        <div className="BoarderTL">
          <h2>Tutorial</h2>
          <b>UPBEAT </b>
          is a turn-based game where players compete to claim an entire
          territory.
          <br /> Each player starts with an initial budget, a starting region
          (city center), and an opportunity to devise an initial construction
          plan. <br />
          <br />
          <b>GAMEPLAY </b> <br />
          The game proceeds in turns, At the beginning of each turn, regions
          belonging to the current player accrue interest, and the player can
          revise their construction plan within the specified time limit. During
          their turn, players execute commands in their construction plan to
          expand their territory, invest in regions, collect deposits, attack
          opponents, etc. The game ends when only one player remains owning
          regions in the territory.
          <br />
          <br />
          <button className={"pixel2"} onClick={handleButtonClick}>
            BACK
          </button>
        </div>
        <div className="BoarderTR">
          <b>COMMANDS </b> <br />
          Players can use various commands in their construction plan
          <br />
          Assignment : Assign values to variables.
          <br />
          Action : Commands like move, invest, collect, <br />
          shoot, etc.
          <br /> Control : If statements, while loops, etc.
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
