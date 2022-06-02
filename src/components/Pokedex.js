import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PokeDetails from './PokeDetails';
import PokePicture from './PokePicture';

const Pokedex = () => {
    const apiBackendPath = `${process.env.REACT_APP_POKEAPI}?limit=100000&offset=0`;
    //const pokemonPerPage = 18;
    const offset = 0;
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    // const [currentPage, setCurrentPage] = useState(0);
    const [pokemonPerPage, setPokemonPerPage] = useState(18);
    // const [offset, setOffset] = useState(0);
    const [pokemon, setPokemon] = useState(null);
    const [previewPokemon, setPreviewPokemon] = useState(null);
    const [filteredPokemon, setFilteredPokemon] = useState(null);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        if (searchString.length < 3 && !filteredPokemon) {
            axios
                .get(apiBackendPath)
                .then(res => {
                    setPokemon(res.data.results);
                    setFilteredPokemon(res.data.results);
                    setLoading(false)
                })
                .catch(err => console.log(err));
        } else if (loading) {
            setFilteredPokemon(pokemon.filter(
                
                filterPoke => filterPoke.name.toLowerCase().includes(searchString.toLowerCase())
            ));
            setLoading(false);
        }
    }, [offset, filteredPokemon, pokemon, searchString, apiBackendPath]);


    const showDetailHandler = (e) => {
        setPreviewPokemon(e.target.name);
        setShowDetails(true);
    }

    const closeDetailHandler = (e) => {
        setPreviewPokemon(null);
        setShowDetails(false);
    }

    const searchHandler = async ({ target }) => {
        if (target.value.length >= 3) {
            setLoading(true);
            setSearchString(target.value);
        } else if(searchString !== ''){
            setSearchString('');
            setFilteredPokemon(pokemon);
            setPokemonPerPage(18);
            setLoading(false);
        }
    }

    const showMoreHandler = (e) => {
        setPokemonPerPage(pokemonPerPage + 18);        
    }

    return (
        <>
            <h2 className='text-center my-5'>Find your Pokémon</h2>
            <input onChange={searchHandler} className='w-full text-xl border rounded' placeholder='live search (3 letters)' />
            <div className='flex flex-wrap justify-between'>
                {loading ? <h3 className='text-center'>Loading...</h3> : (
                    <>
                        {
                            filteredPokemon.map((snglPokemon, index) => {
                                return (
                                    (index >= offset && index < offset + pokemonPerPage) && (
                                        <div key={`Pokemon_${snglPokemon.name}`}>
                                            <button name={`${snglPokemon.name.toLowerCase()}`} onClick={showDetailHandler} className='my-3'>
                                                <PokePicture id={snglPokemon.name} name={`${snglPokemon.name}`} />
                                                <p>{snglPokemon.name}</p>
                                            </button>
                                        </div>
                                    )
                                );
                            })
                        }
                        <PokeDetails open={showDetails} onClose={closeDetailHandler} selectedPokemon={previewPokemon} />
                    </>
                )}
            </div>
            <div>

            </div>
                <button className={'border rounded p-2 bg-darkblue'} onClick={showMoreHandler}>select</button>
        </>
    )
}

export default Pokedex