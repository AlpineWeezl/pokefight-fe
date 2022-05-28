import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PokeDetails = ({ open, onClose, children, selectedPokemon }) => {
    console.log(selectedPokemon);
    const pokeApiPath = `${process.env.REACT_APP_POKEAPI}`;
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (selectedPokemon) {
            axios
                .get(`${pokeApiPath}/${selectedPokemon}`)
                .then(res => {
                    setPokemonDetails(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err);
                });
        }
    }, [selectedPokemon, pokeApiPath])


    return (
        <div className={`fixed inset-0 ${open ? '' : 'pointer-events-none'}`}>
            {/* backdrop */}
            <div
                className={`fixed inset-0 bg-black ${open ? 'opacity-50' : 'pointer-events-none opacity-0'} transition-opacity duration-500 ease-in-out`}
                onClick={onClose}
            />

            {/* content */}
            <div className='fixed container min-h-screen p-3'>
                <div className={`bg-white shadow-lg p-4 mx-auto rounded ${open ? 'opacity-100' : 'pointer-events-none opacity-0'} transition-opacity duration-500 ease-in-out`}>
                    <div className='flex justify-end text-3xl'>
                        <button onClick={onClose}><FontAwesomeIcon icon={faTimes} /></button>
                    </div>
                    {
                        (
                            selectedPokemon && (
                                <div>
                                    <h2>
                                        {selectedPokemon}
                                    </h2>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default PokeDetails;