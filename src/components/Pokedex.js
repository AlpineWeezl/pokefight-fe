import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import PokeDetails from './PokeDetails';
import PokePicture from './PokePicture';

const Pokedex = () => {
    const apiBackendPath = `${process.env.REACT_APP_POKEFIGHT_API}/api/pokemon`;
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [pokemonPerPage, setPokemonPerPage] = useState(20);
    const [offset, setOffset] = useState(0);
    const [pokemon, setPokemon] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        axios
            .get(apiBackendPath)
            .then(res => {
                setPokemon(res.data);
                setLoading(false)
            })
            .catch(err => console.log(err));
    }, [apiBackendPath]);


    const detailHandler = (e) => {

    }

    return (
        <>
            <h2 className='text-center my-5'>Find your Pokémon</h2>
            <input className='w-full text-xl border rounded' placeholder='live search' />
            <div className='flex flex-wrap justify-between'>
                {loading ? <h3 className='text-center'>Loading...</h3> : (
                    pokemon.map((snglPokemon, index) => {
                        if (index >= offset && index <= offset + pokemonPerPage) {
                            return (
                                <div key={`Pokemon_${snglPokemon.id}`}>
                                    <button onClick={detailHandler} className='my-3'>
                                        <PokePicture name={`${snglPokemon.name.english.toLowerCase()}`} />
                                        <PokeDetails name={`${snglPokemon.name.english.toLowerCase()}`} />
                                    </button>
                                </div>
                            );
                        } else {
                            return <></>
                        }
                    })
                )}
            </div>
        </>
    )
}

export default Pokedex