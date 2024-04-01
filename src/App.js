import "./App.css";
import Menu from "./component/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./component/Lobby";
import Gameplay from "./component/Gameplay";
import Tutorial from "./component/Tutorial";
import axios from "axios";

axios.defaults.baseURL = "";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Menu />} />
          <Route path="/Lobby" element={<Lobby />} />
          <Route path="/Lobby/:playername" element={<Lobby />} />
          <Route path="/Gameplay/:name" element={<Gameplay />} />
          <Route path="/Tutorial" element={<Tutorial />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
