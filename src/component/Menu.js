import { useState } from "react";
import Button from "./button";
const Menu = () => {
  const [Title, setTitle] = useState([
    { title: "2 Player", id: 1 },
    { title: "3 Player", id: 2 },
  ]);
  return (
    <div>
      <div>
        <div className="UpbeatTitle">UPBEAT</div>
        <div className="UpbeatTitleDis">Project from group 29</div>
      </div>

      <div className="Menu">
        <Button Title={Title} />
      </div>
    </div>
  );
};

export default Menu;
