import React, { createContext, useState, useContext } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  const addPlayer = (name) => {
    setPlayers([...players, { name, ready: false }]);
  };

  const updatePlayer = (index, ready) => {
    const updatedPlayers = players.map((player, i) =>
      i === index ? { ...player, ready } : player
    );
    setPlayers(updatedPlayers);
  };

  return (
    <PlayerContext.Provider value={{ players, addPlayer, updatePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
