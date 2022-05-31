import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { playerContext } from '../context/PlayerName';

const Home = () => {
    const { setPlayerName } = useContext(playerContext);

    const playerNameChangeHandler = (e) => {
        setPlayerName(e.target.value);
    }

    return (
        <div className='text-center'>
            <h1 className='text-3xl my-6'>Welcome to Pokéfight</h1>
            <h2 className='text-2xl my-6'>Choose your Pokémon and climb the ladder!</h2>
            <div className='p-6'>
                <input className='border rounded-md p-3' onChange={playerNameChangeHandler} placeholder='Your Name' />
            </div>
            <div className='my-6'>
                <Link className='bg-darkblue text-white p-5 rounded-md' to={'/pokemon'}>Play!</Link>
            </div>
        </div>
    )
}

export default Home