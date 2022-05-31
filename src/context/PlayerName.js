import { useState, createContext } from "react";

export const playerContext = createContext();

const PlayerState = ({ children }) => {
  const [playerName, setPlayerName] = useState(null);
  return (
    <playerContext.Provider value={{ playerName, setPlayerName }}>
      {children}
    </playerContext.Provider>
  );
};

export default PlayerState;
