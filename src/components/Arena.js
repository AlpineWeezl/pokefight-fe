import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { gameContext } from '../context/GameContext';
import ArenaDetails from './ArenaDetails';

const Arena = () => {
    const pokeApiPath = `${process.env.REACT_APP_POKEAPI}`;
    const { playerPokemon, enemyPokemon, setEnemyPokemon } = useContext(gameContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <>
            {(!playerPokemon || !enemyPokemon) && <Navigate to='/' replace={true} />}
            {error && <h2>Oh no, something went wrong</h2>}
            {(loading && !error) && <h2>Loading ...</h2>}
            {
                (!loading && !error) &&
                <>
                    <div className='flex flex-col grow'>
                        <h2 className='text-center text-2xl'>Fight!</h2>
                        <div className='flex-grow text-center'>
                            <div className='flex-none rounded bg-skyblue shadow-lg'>
                                <div className='flex justify-center'>
                                    <img className='w-1/2' src={enemyPokemon.extended.sprites.front_default} alt={enemyPokemon.name} />
                                </div>
                                <ArenaDetails />
                                <h3 className='py-3 text-3xl'>{enemyPokemon.name}</h3>
                            </div>
                            <div className='grow align-middle justify-center text-center text-4xl'>
                                <p>Battleground</p>
                            </div>
                            <div className='flex-none bg-skyblue shadow-lg'>
                                <h3 className='py-3 text-3xl'>{playerPokemon.name}</h3>
                                <ArenaDetails />
                                <div className='flex justify-center'>
                                    <img className='w-1/2' src={playerPokemon.extended.sprites.back_default} alt={playerPokemon.name} />
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