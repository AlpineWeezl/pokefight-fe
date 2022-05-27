import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const Pokedex = () => {
    const apiPath = `${process.env.REACT_APP_POKEFIGHT_API}/api/pokemon`;
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [pokemonPerPage, setPokemonPerPage] = useState(20);
    const [offset, setOffset] = useState(0);
    const [pokemon, setPokemon] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        axios
            .get(apiPath)
            .then(res => {
                setPokemon(res.data);
                setLoading(false)
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, [apiPath]);

    return (
        <>
            <h2 className='text-center my-5'>Pokedex</h2>
            <ul>

                {loading ? <Skeleton /> : (
                    pokemon.map(snglPokemon => {
                        return (
                            <li>
                                {`${snglPokemon.name.english}`}
                            </li>
                        );
                    })
                )}
            </ul>
        </>
    )
}

export default Pokedex