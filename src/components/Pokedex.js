import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { gameContext } from '../context/GameContext';
import PokeDetails from './PokeDetails';
import PokePicture from './PokePicture';

const Pokedex = () => {
    const apiBackendPath = `${process.env.REACT_APP_POKEAPI}?limit=100000&offset=0`;
    const offset = 0;
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const [pokemonPerPage, setPokemonPerPage] = useState(18);
    const { pokedex, setPokedex, setPlayerPokemon, playerName, playerPokemon } = useContext(gameContext)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString, apiBackendPath, pokemonPerPage]);


    const showDetailHandler = async ({ target }) => {
        await setPlayerPokemon(await pokedex.find(tempPokemon => tempPokemon.name === target.name))
        setShowDetails(true);
    }

    const closeDetailHandler = async (e) => {
        await setPlayerPokemon(null);
        setShowDetails(false);
    }

    const searchHandler = async ({ target }) => {
        if (target.value.length >= 3) {
            setLoading(true);
            setSearchString(target.value);
        } else if (searchString !== '') {
            setSearchString('');
            setFilteredPokemon(pokedex);
            setPokemonPerPage(18);
            setLoading(false);
        }
    }

    const showMoreHandler = (e) => {
        setPokemonPerPage(pokemonPerPage + 18);
    }

    return (
        <>
            {!playerName && <Navigate to={'/'} replace={true} />}
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
                                                <PokePicture id={snglPokemon.name} name={snglPokemon.name} />
                                                <p name={snglPokemon.name}>{snglPokemon.name}</p>
                                            </button>
                                        </div>
                                    )
                                );
                            })
                        }
                        {playerPokemon && <PokeDetails open={showDetails} onClose={closeDetailHandler} />}
                    </>
                )}
            </div>
            <div>

            </div>
            <div className='text-center m-5'>
                <button className={'border rounded p-2 bg-darkblue text-white'} onClick={showMoreHandler}>Show more</button>
            </div>
        </>
    )
}

export default Pokedex