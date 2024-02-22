import "./App.css";
import Menu from "./component/Menu";
import HexGridDemo from "./component/Grid";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./component/Lobby";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Menu />} />
          <Route path="/Lobby" element={<Lobby />} />
          <Route path="/Lobby/:numberOfPlayers" element={<Lobby />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
