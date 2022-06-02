import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { gameContext } from '../context/GameContext';
import Stats from './Stats';
import Types from './Types';

const PokeDetails = ({ open, onClose, children, selectedPokemon }) => {
    const pokeApiPath = `${process.env.REACT_APP_POKEAPI}`;
    const { pokedex, playerPokemon, setPlayerPokemon, playerName, setEnemyPokemon, enemyPokemon } = useContext(gameContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (playerPokemon) {
            axios
                .get(`${pokeApiPath}/${playerPokemon.name.toLowerCase()}`)
                .then(res => {
                    setPlayerPokemon(
                        {
                            ...playerPokemon,
                            extended: res.data
                        }
                    );
                    setLoading(false);
                })
                .catch(err => {
                    setError(err);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokeApiPath])

    const arenaHandler = async () => {
        await setEnemyPokemon(async () => {
            const randomIndex = Math.floor(Math.random() * pokedex.length);
            await setEnemyPokemon(pokedex[randomIndex]);
        })
    }

    return (
        <>
            {enemyPokemon && <Navigate to={'/arena'} replace={true} />}
            {console.log(playerPokemon)}
            {!playerName && (<Navigate to={'/'} replace={true} />)}
            {!playerPokemon && onClose}
            <div className={`fixed inset-0 ${open ? '' : 'pointer-events-none'}`}>
                {/* backdrop */}
                <div
                    className={`fixed inset-0 bg-black ${open ? 'opacity-50' : 'pointer-events-none opacity-0'} transition-opacity duration-500 ease-in-out`}
                    onClick={onClose}
                />

                {/* content */}
                <div className='fixed container min-h-screen p-3'>
                    <div className={`bg-white shadow-lg p-4 mx-auto min-h-full rounded ${open ? 'opacity-100' : 'pointer-events-none opacity-0'} transition-opacity duration-500 ease-in-out`}>
                        {error && <h2>Oh no, an error occured. See console for more details</h2>}
                        {(loading && !error) && <h2>Loading ...</h2>}
                        {
                            (!loading && !error) && (
                                <>
                                    <div className='flex justify-end text-3xl'>
                                        <button onClick={onClose}><FontAwesomeIcon icon={faTimes} /></button>
                                    </div>
                                    {
                                        (
                                            playerPokemon && (
                                                <>
                                                    <div className='bg-white'>
                                                        <img src={playerPokemon.extended.sprites.other['official-artwork'].front_default} alt={playerPokemon.name} />
                                                        <h2 className='text-center text-3xl'>
                                                            {playerPokemon.name}
                                                        </h2>
                                                    </div>
                                                    <div className='flex justify-between my-5'>
                                                        <div><Types types={playerPokemon.extended.types} /></div>
                                                        <div><Stats stats={playerPokemon.extended.stats} /></div>
                                                    </div>
                                                    <div className={'flex justify-evenly text-white my-5'}>
                                                        <button onClick={onClose} className={'border rounded p-2 bg-red'}>close</button>
                                                        <button onClick={arenaHandler} className={'border rounded p-2 bg-darkblue'}>select</button>
                                                    </div>
                                                </>
                                            )
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PokeDetails;