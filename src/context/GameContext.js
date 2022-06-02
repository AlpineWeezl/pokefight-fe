import { useState, createContext } from "react";

export const gameContext = createContext();

const GameState = ({ children }) => {
    const [playerName, setPlayerName] = useState(null);
    const [pokedex, setPokedex] = useState(null);
    const [playerPokemon, setPlayerPokemon] = useState(null);
    const [enemyPokemon, setEnemyPokemon] = useState(null);

    return (
        <gameContext.Provider value={{ playerName, setPlayerName, pokedex, setPokedex, playerPokemon, setPlayerPokemon, enemyPokemon, setEnemyPokemon }}>
            {children}
        </gameContext.Provider>
    );
};

export default GameState;