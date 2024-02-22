import { useState } from "react";
import Button from "./button";
import UBEATTitle from "./UBEATTitle";
import { useNavigate } from "react-router-dom";
const Menu = () => {
  const navigate = useNavigate();

  const handleButtonClick = (numberOfPlayers) => {
    navigate(`/Lobby/${numberOfPlayers}`);
  };
  return (
    <div className="MenuBackground">
      <div>
        <UBEATTitle />
      </div>

      <div className="Menu">
        <Button Title="2 Player" handleClick={() => handleButtonClick(2)} />
        <Button Title="3 Player" handleClick={() => handleButtonClick(3)} />
      </div>
    </div>
  );
};

export default Menu;
