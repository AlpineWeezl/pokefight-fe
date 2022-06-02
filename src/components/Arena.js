import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { pokedexContext } from '../context/Pokedex'
import ArenaDetails from './ArenaDetails';

const Arena = () => {
    const { pokemon, pokedex, enemy, setEnemy } = useContext(pokedexContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const randomPokemonIndex = Math.floor(Math.random() * pokedex.length);
        const randomPokemon = pokedex[randomPokemonIndex];
        axios
            .get(`${process.env.REACT_APP_POKEAPI}/${randomPokemon.name}`)
            .then(res => {
                setEnemy(res.data);
                setLoading(false);
            })
            .catch(err => { setError(err) });

    }, []);


    return (
        <div className='text-center'>
            <h2 className='text-3xl'>Arena</h2>
            <hr />
            {(error) && <h3>Oh no, an error occured!</h3>}
            {(!error && loading) && <h3>Loading ...</h3>}
            {
                (!error && !loading) && (
                    <div className='text-xl'>
                        <div name='enemy' className='flex flex-col align-middle'>
                            <img src={enemy.sprites.front_default} alt={enemy.sprites.name} className='w-1/2 m-auto' />
                            <h3 className=''>{enemy.name}</h3>
                            <ArenaDetails isPlayer={true}/>
                        </div>
                        <div className='h-[25vh]'>

                        </div>
                        <div name='player' className='flex flex-col align-middle'>
                            <ArenaDetails isPlayer={false} />
                            <h3 className=''>{pokemon.name}</h3>
                            <img src={pokemon.sprites.back_default} alt={pokemon.sprites.name} className='w-1/2 m-auto' />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Arena;
