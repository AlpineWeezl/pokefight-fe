import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PokePicture = ({ name }) => {
    const pokeApiPath = `${process.env.REACT_APP_POKEAPI}`;
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        axios
            .get(`${pokeApiPath}/${name}`)
            .then(res => {
                console.log(res);
                setPokemonDetails(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
            });
    }, [name, pokeApiPath])
    return (
        <>
            {loading ? <h3>loading...</h3> : (
                error ? <p>Not found</p> : (
                    <img src={`${pokemonDetails.sprites.front_default}`} alt={name} />
                )
            )}
        </>
    )
}

export default PokePicture