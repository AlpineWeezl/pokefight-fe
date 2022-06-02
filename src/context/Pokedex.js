import { useState, createContext } from "react";

export const pokedexContext = createContext();

const PokedexState = ({ children }) => {
    const [pokedex, setPokedex] = useState(null);
    const [pokemon, setPokemon] = useState(null);
    const [enemy, setEnemy] = useState(null);
    return (
        <pokedexContext.Provider value={{ pokedex, setPokedex, pokemon, setPokemon, enemy, setEnemy}}>
            {children}
        </pokedexContext.Provider>
    );
};


export default PokedexState;
