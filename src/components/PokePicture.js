import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PokePicture = ({ id, name }) => {
    const pokeApiPath = `${process.env.REACT_APP_POKEAPI}`;
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        axios
            .get(`${pokeApiPath}/${name.toLowerCase()}`)
            .then(res => {
                setPokemonDetails(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
            });
    }, [name, pokeApiPath])
    return (
        <>
            {error && <p>Not found</p>}
            {(loading && !error) && <h3>loading...</h3>}
            {(!loading && !error) && (
                    <img id={`${id}`} src={`${pokemonDetails.sprites.front_default}`} alt={name} name={name} />
            )}
        </>
    )
}

export default PokePicture