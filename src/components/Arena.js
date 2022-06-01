import React, { useContext, useState } from 'react'
import { pokedexContext } from '../context/Pokedex'

const Arena = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const { pokedex, setPokedex } = useContext(pokedexContext);

    if (error) {
        return (
            <>
                <h2>Arena</h2>
                <h3>Oh no, an error occured!</h3>
            </>
        )
    }

    if (loading) {
        return (
            <>
                <h2>Arena</h2>
                <h3>Loading...</h3>
            </>
        )
    }
}

export default Arena
