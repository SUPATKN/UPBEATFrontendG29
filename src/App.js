import "./App.css";
import Menu from "./component/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./component/Lobby";
import Gameplay from "./component/Gameplay";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Menu />} />
          <Route path="/Lobby" element={<Lobby />} />
          <Route path="/Lobby/:playername" element={<Lobby />} />
          <Route path="/Gameplay/:name" element={<Gameplay />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
