import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./button";
const Box = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameCheck, setNameCheck] = useState(false);
  const [first, setFirst] = useState(false);

  const CheckName = async (Name) => {
    console.log(name);
    const response = await axios.post(
      `http://10.126.224.91:8080/checkName`,
      Name,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);
    setNameCheck(!response.data);
    console.log(nameCheck);
    setFirst(true);
  };

  const handleSubmit = async () => {
    if (nameCheck) {
      try {
        console.log(name);
        const response = await axios.post(
          "http://10.126.224.91:8080/addplayer",
          name,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Player added:", response.data);
        navigate(`/Lobby/${name}`);
      } catch (error) {
        console.error("Error adding player:", error);
      }
    }
  };

  return (
    <div className="BoxContainer">
      <label>Enter your name</label>
      <br></br>
      <input
        className={"font inputCus"}
        style={{ textAlign: "center" }}
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          CheckName(e.target.value); // เรียกใช้ CheckName ทุกครั้งที่มีการเปลี่ยนแปลงในช่อง input
        }}
      />
      <div className="submitBot">
        <button className={"pixel2 "} onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {first && !nameCheck && (
        <div className="Warning">
          This name has already been used
          <br />
          Please try a new name
        </div>
      )}
    </div>
  );
};

export default Box;
