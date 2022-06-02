import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { gameContext } from '../context/GameContext';

const Home = () => {
    const { playerName, setPlayerName } = useContext(gameContext);

    const submitHandler = (e) => {
        const { target } = e;
        e.preventDefault();
        try {
            setPlayerName(target.playerName.value);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        {playerName && <Navigate to={'/pokemon'} replace={true} />}
            <div className='text-center'>
                <h1 className='text-3xl my-6'>Welcome to Pokéfight</h1>
                <h2 className='text-2xl my-6'>Choose your Pokémon and climb the ladder!</h2>
                <form onSubmit={submitHandler}>
                    <div className='p-6'>
                        <input name='playerName' className='border rounded-md p-3' placeholder='Your Name' />
                    </div>
                    <div className='my-6'>
                        <button type='submit' className='bg-darkblue text-white p-5 rounded-md'>Play!</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Home