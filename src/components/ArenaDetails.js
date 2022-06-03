import React, { useContext, useEffect, useState } from 'react'
import { gameContext } from '../context/GameContext'

const ArenaDetails = ({ isPlayer }) => {
    const { playerPokemon, enemyPokemon } = useContext(gameContext);
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        isPlayer ? setPokemon(playerPokemon) : setPokemon(enemyPokemon);
        pokemon && setLoading(false);
    }, [isPlayer, playerPokemon, enemyPokemon, pokemon])



    return (
        <>
            {
                (!loading) && (

                    <div className='border rounded bg-lightblue p-2'>
                        <table>
                            <tbody>
                                {
                                    pokemon.extended.stats.map(stat => {
                                        return (
                                            <tr key={`${pokemon.name}_${stat}`}>
                                                <td className='text-right py-1 px-1'>{stat.stat.name}</td>
                                                <td className='pr-1 text-right'>{stat.base_stat}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </>
    )
}

export default ArenaDetails