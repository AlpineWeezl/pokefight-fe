import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { pokedexContext } from '../context/Pokedex';
import Stats from './Stats';
import Types from './Types';

const PokeDetails = ({ open, onClose }) => {
  const { pokemon, setPokemon } = useContext(pokedexContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_POKEAPI}/${pokemon.name}`)
      .then(res => {
        setPokemon(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        console.log(err);
      });
  }, [])


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
            {error && <h2>Oh no, an error occured. See console for more details {error.message}</h2>}
            {(loading && !error) && <h2>Loading ...</h2>}
            {
              (!loading && !error) && (
                <>
                  <div className='flex justify-end text-3xl'>
                    <button onClick={onClose}><FontAwesomeIcon icon={faTimes} /></button>
                  </div>
                  {
                    (
                      pokemon && (
                        <>
                          <div className='bg-white'>
                            {console.log(pokemon)}
                            <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                            <h2 className='text-center text-3xl'>
                              {pokemon.name}
                            </h2>
                          </div>
                          <div className='flex justify-between my-5'>
                            <div><Types types={pokemon.types} /></div>
                            <div><Stats stats={pokemon.stats} /></div>
                          </div>
                          <div className={'flex justify-evenly text-white my-5'}>
                            <button onClick={onClose} className={'border rounded p-2 bg-red'}>close</button>
                            <Link to={'/arena'} className={'border rounded p-2 bg-darkblue'}>select</Link>
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