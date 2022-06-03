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
    const [playerWon, setPlayerWon] = useState();

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
        let gameOver = false;
        let playerTurn;
        firstRound && enemyPokemon.extended.stats[5].base_stat < playerPokemon.extended.stats[5].base_stat ? playerTurn = true : playerTurn = false;
        console.log(playerTurn);

        //Math.round((playerPokemon.extended.stats[1].base_stat - (playerPokemon.extended.stats[1] / (enemyPokemon.extended.stats[2].base_stat * 0.1))));
        setFirstRound(false);

        while (!gameOver)
        {
                if (playerTurn)
                {
                    enemyPokemon.extended.stats[0].base_stat = enemyPokemon.extended.stats[0].base_stat - (playerPokemon.extended.stats[1].base_stat - Math.round(enemyPokemon.extended.stats[2].base_stat * 0.1));
                    console.log(enemyPokemon.extended.stats[0].base_stat)
                    console.log("player turn");
                    playerTurn = !playerTurn;
                    toggleTurn();
        
                } else {
                    playerPokemon.extended.stats[0].base_stat = playerPokemon.extended.stats[0].base_stat - (enemyPokemon.extended.stats[1].base_stat - Math.round(playerPokemon.extended.stats[2].base_stat * 0.1));
                    console.log(playerPokemon.extended.stats[0].base_stat)
                    console.log("enemy turn");
                    playerTurn = !playerTurn;
                    toggleTurn();
                }
    
                if(playerPokemon.extended.stats[0].base_stat <= 0 || enemyPokemon.extended.stats[0].base_stat <= 0)
                {
                    gameOver = true;
                    if(enemyPokemon.extended.stats[0].base_stat <= 0)
                    {
                        setPlayerWon(true);
                    }
                    else 
                    {
                        setPlayerWon(false);
                    }
                    
                }
        }

        

    }

    
    const leftHp = (offense, defense) => {
        defense.extended.stats[0].base_stat = defense.extended.stats[0].base_stat - offense.extended.stats[1].base_stat;
    }
    
    const toggleTurn = () => {
        setIsPlayerTurn(!isPlayerTurn);
        
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
                            <div className='flex-none rounded-md bg-skyblue shadow-lg'>
                                <div className='flex justify-center'>
                                    <ArenaDetails isPlayer={false} />
                                    <img src={enemyPokemon.extended.sprites.front_default} alt={enemyPokemon.name} />
                                </div>
                                <h3 className='text-3xl'>{enemyPokemon.name}</h3>
                            </div>
                            <div className='grow align-middle justify-center text-center text-2xl py-3 my-4'>
                                <button onClick={fight} className='py-3 px-32 rounded-md shadow-md bg-red text-white'>Fight!</button>
                            </div>
                            <div className='flex-none rounded-md bg-lightyellow shadow-lg p-2'>
                                <h3 className='text-3xl'>{playerPokemon.name}</h3>
                                <div className='flex justify-between'>
                                    <img className='w-1/2 h-1/2' src={playerPokemon.extended.sprites.back_default} alt={playerPokemon.name} />
                                    <ArenaDetails isPlayer={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            {playerWon && {
                if(playerWon)
                {
                    //Post to mongoDB
                }
                //Show End screen component
            }}
        </>
    )
}

export default Arena