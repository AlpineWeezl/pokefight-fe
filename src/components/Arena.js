import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { gameContext } from '../context/GameContext';
import ArenaDetails from './ArenaDetails';

const Arena = () => {
    const pokeApiPath = `${process.env.REACT_APP_POKEAPI}`;
    const { playerPokemon, enemyPokemon, setEnemyPokemon } = useContext(gameContext);
    const [isPlayerTurn, setIsPlayerTurn] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [firstRound, setFirstRound] = useState(true);

    useEffect(() => {
        axios
            .get(`${pokeApiPath}/${enemyPokemon.name.toLowerCase()}`)
            .then(res => {
                setEnemyPokemon(
                    {
                        ...enemyPokemon,
                        extended: res.data
                    }
                );
                setLoading(false);
            })
            .catch(err => {
                setError(err);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerPokemon])

    const fight = () => {
        firstRound && enemyPokemon.extended.stats[5].base_stat < playerPokemon.extended.stats[5].base_stat ? setIsPlayerTurn(true) : setIsPlayerTurn(false);
        setFirstRound(false);

    }

    setIsPlayerTurn(!isPlayerTurn);
    
    const leftHp = (offense, defense) => {
        // Schaden = ((2 x Lv. / 5 + 2) x Base x SpAtk : 50 : SpDef x Mod1 + 2) x Volltreffer x Mod2 x Random / 100 x Stab x Typ1 x Typ2 x Mod3
        defense.extended.stats[0].base_stat = defense.extended.stats[0].base_stat - offense.extended.stats[1].base_stat;
    }
    
    const toggleTurn = () => {
    
    }

    
    return (
        <>
            {!playerPokemon && <Navigate to='/' replace={true} />}
            {error && <h2>Oh no, something went wrong</h2>}
            {(loading && !error) && <h2>Loading ...</h2>}
            {
                (!loading && !error) &&
                <>
                    <div className='flex flex-col grow'>
                        <div className='flex-grow text-center'>
                            <div className='flex-none rounded-md bg-lightyellow shadow-lg'>
                                <div className='flex justify-center'>
                                    <ArenaDetails isPlayer={false} />
                                    <img src={enemyPokemon.extended.sprites.front_default} alt={enemyPokemon.name} />
                                </div>
                                <h3 className='py-3 text-3xl'>{enemyPokemon.name}</h3>
                            </div>
                            <div className='grow align-middle justify-center text-center text-2xl py-3 my-4'>
                                <button onClick={fight} className='py-3 px-32 rounded-md shadow-md bg-red text-white'>Fight!</button>
                            </div>
                            <div className='flex-none rounded-md bg-lightyellow shadow-lg p-2'>
                                <h3 className='py-3 text-3xl'>{playerPokemon.name}</h3>
                                <div className='flex justify-center'>
                                    <img src={playerPokemon.extended.sprites.back_default} alt={playerPokemon.name} />
                                    <ArenaDetails isPlayer={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Arena