import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { pokedexContext } from '../context/Pokedex';
import PokeDetails from './PokeDetails';
import PokePicture from './PokePicture';

const Pokedex = () => {
    const apiBackendPath = `${process.env.REACT_APP_POKEAPI}?limit=100000&offset=0`;
    const offset = 0;
    const { pokemon, setPokemon, pokedex, setPokedex } = useContext(pokedexContext);
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const [pokemonPerPage, setPokemonPerPage] = useState(18);
    const [filteredPokemon, setFilteredPokemon] = useState(null);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        if (searchString.length < 3 && !filteredPokemon) {
            axios
                .get(apiBackendPath)
                .then(res => {
                    setPokedex(res.data.results);
                    setFilteredPokemon(res.data.results);
                    setLoading(false)
                })
                .catch(err => console.log(err));
        } else if (loading) {
            setFilteredPokemon(pokedex.filter(
                filterPoke => filterPoke.name.toLowerCase().includes(searchString.toLowerCase())
            ));
            setLoading(false);
        }
    }, [offset, searchString, apiBackendPath]);


    const showDetailHandler = async (e) => {
        await setPokemon(pokedex.find(poke => poke.name === e.target.name));
        console.log(pokemon);
        setShowDetails(true);
    }

    const closeDetailHandler = (e) => {
        setPokemon(null);
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
                        {pokemon && <PokeDetails open={showDetails} onClose={closeDetailHandler} />}
                    </>
                )}
            </div>
            <div>
                <button className={'border rounded p-2 bg-darkblue'} onClick={showMoreHandler}>select</button>
            </div>
        </>
    )
}

export default Pokedex