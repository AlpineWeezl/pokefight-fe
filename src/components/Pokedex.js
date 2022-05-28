import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PokeDetails from './PokeDetails';
import PokePicture from './PokePicture';

const Pokedex = () => {
    const apiBackendPath = `${process.env.REACT_APP_POKEFIGHT_API}/api/pokemon`;
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pokemonPerPage, setPokemonPerPage] = useState(18);
    const [offset, setOffset] = useState(0);
    const [pokemon, setPokemon] = useState(null);
    const [previewPokemon, setPreviewPokemon] = useState(null);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        axios
            .get(apiBackendPath)
            .then(res => {
                setPokemon(res.data.filter((poke, index) => {
                    return (index >= offset && index < offset + pokemonPerPage);
                }));
                setLoading(false)
            })
            .catch(err => console.log(err));
    }, [apiBackendPath]);


    const showDetailHandler = (e) => {
        setPreviewPokemon(e.target.name);
        setShowDetails(true);
    }

    const closeDetailHandler = (e) => {
        setPreviewPokemon(null);
        setShowDetails(false);
    }

    return (
        <>
            <h2 className='text-center my-5'>Find your Pokémon</h2>
            <input className='w-full text-xl border rounded' placeholder='live search' />
            <div className='flex flex-wrap justify-between'>
                {loading ? <h3 className='text-center'>Loading...</h3> : (
                    <>
                        {
                            pokemon.map((snglPokemon, index) => {
                                return (
                                    <div key={`Pokemon_${snglPokemon.id}`}>
                                        <button name={`${snglPokemon.name.english.toLowerCase()}`} onClick={showDetailHandler} className='my-3'>
                                            <PokePicture id={snglPokemon.id} name={`${snglPokemon.name.english}`} />
                                            <p>{snglPokemon.name.english}</p>
                                        </button>
                                    </div>
                                );
                            })
                        }
                        <PokeDetails open={showDetails} onClose={closeDetailHandler} selectedPokemon={previewPokemon} />
                    </>
                )}
            </div>
        </>
    )
}

export default Pokedex