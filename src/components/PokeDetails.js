import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { gameContext } from '../context/GameContext';
import Stats from './Stats';
import Types from './Types';

const PokeDetails = ({ open, onClose, children, selectedPokemon }) => {
  const pokeApiPath = `${process.env.REACT_APP_POKEAPI}`;
  const {playerPokemon, setPlayerPokemon} = useContext(gameContext);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (selectedPokemon) {
      axios
        .get(`${pokeApiPath}/${playerPokemon.name.toLowerCase()}`)
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
    <>
      <div className={`fixed inset-0 ${open ? '' : 'pointer-events-none'}`}>
        {/* backdrop */}
        <div
          className={`fixed inset-0 bg-black ${open ? 'opacity-50' : 'pointer-events-none opacity-0'} transition-opacity duration-500 ease-in-out`}
          onClick={onClose}
        />

        {/* content */}
        <div className='fixed container min-h-screen p-3'>
          <div className={`bg-white shadow-lg p-4 mx-auto min-h-full rounded ${open ? 'opacity-100' : 'pointer-events-none opacity-0'} transition-opacity duration-500 ease-in-out`}>
            {error && <h2>Oh no, an error occured. See console for more details</h2>}
            {(loading && !error) && <h2>Loading ...</h2>}
            {
              (!loading && !error) && (
                <>
                  <div className='flex justify-end text-3xl'>
                    <button onClick={onClose}><FontAwesomeIcon icon={faTimes} /></button>
                  </div>
                  {
                    (
                      selectedPokemon && (
                        <>
                          <div className='bg-white'>
                            <img src={pokemonDetails.sprites.other['official-artwork'].front_default} alt={selectedPokemon} />
                            <h2 className='text-center text-3xl'>
                              {selectedPokemon}
                            </h2>
                          </div>
                          <div className='flex justify-between my-5'>
                            <div><Types types={pokemonDetails.types} /></div>
                            <div><Stats stats={pokemonDetails.stats} /></div>
                          </div>
                          <div className={'flex justify-evenly text-white my-5'}>
                            <button onClick={onClose} className={'border rounded p-2 bg-red'}>close</button>
                            <button className={'border rounded p-2 bg-darkblue'}>select</button>
                          </div>
                        </>
                      )
                    )
                  }
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default PokeDetails;