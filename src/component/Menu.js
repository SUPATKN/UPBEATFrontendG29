import { useState } from "react";
import Button from "./button";
import UBEATTitle from "./UBEATTitle";
import { useNavigate } from "react-router-dom";
import Box from "./Box";
const Menu = () => {
  const [menuClick, setMenuClick] = useState(false);
  const navigate = useNavigate();
  const [num, setNum] = useState(0);

  const handleButtonClick = (numberOfPlayers) => {
    setMenuClick(true);
    setNum(numberOfPlayers);
  };
  return (
    <div className="MenuBackground">
      <div className={menuClick ? "Hidden" : ""}>
        <UBEATTitle />
      </div>

      <div className={menuClick ? "Hidden" : "Menu"}>
        <Button Title="2 Player" handleClick={() => handleButtonClick(2)} />
        <Button Title="3 Player" handleClick={() => handleButtonClick(3)} />
      </div>
      <div className={!menuClick ? "Hidden" : "Box"}>
        <Box numberOfPlayers={num} />
      </div>
    </div>
  );
};

export default Menu;
