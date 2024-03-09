import { useState } from "react";
import Button from "./button";
import UBEATTitle from "./UBEATTitle";
import { useNavigate } from "react-router-dom";
import Box from "./Box";
const Menu = () => {
  const [menuClick, setMenuClick] = useState(false);

  const handleButtonClick = () => {
    setMenuClick(true);
  };
  return (
    <div className="MenuBackground">
      <div className={menuClick ? "Hidden" : ""}>
        <UBEATTitle />
      </div>

      <div className={menuClick ? "Hidden" : "Menu"}>
        <Button Title="Play Game" handleClick={handleButtonClick} />
      </div>
      <div className={!menuClick ? "Hidden" : "Box"}>
        <Box />
      </div>
    </div>
  );
};

export default Menu;
