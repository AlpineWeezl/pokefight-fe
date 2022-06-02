import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Arena = ({ playerPokemon, pokeDex }) => {
    const pokeApiPath = `${process.env.REACT_APP_POKEAPI}`;
    const [randomPokemon, setRandomPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(playerPokemon);
        do {
            const randomIndex = Math.floor(Math.random() * pokeDex.length);
            setRandomPokemon(pokeDex[randomIndex]);
        } while (randomPokemon.name.english === playerPokemon.name.english)

        axios
            .get(`${pokeApiPath}/${randomPokemon.name.english.toLowerCase()}`)
            .then(res => {
                setRandomPokemon(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
            });

    }, [])

    return (
        <>
            {error && <h2>Oh no, something went wrong</h2>}
            {(loading && !error) && <h2>Arena</h2>}
            {(!loading && !error) &&
                <>
                    <h2>Fight!</h2>
                    <div className='flex justify-end border shadow'>
                        <img src={randomPokemon.name.english} alt={randomPokemon.name.english} />
                    </div>
                </>
            }
        </>
    )
}

export default Arena