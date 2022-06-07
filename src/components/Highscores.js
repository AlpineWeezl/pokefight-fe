import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Highscores = () => {
    const [players, setPlayers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiString = `${process.env.REACT_APP_POKEFIGHT_API}/api/highscores`; // <-- nachschauen, welcher Endpunkt
        axios
            .get(apiString)
            .then(res => {
                setPlayers(res.data.scores.sort((a, b) => b.score - a.score));
                setLoading(false);
            })
            .catch(err => setError(err));
    }, []);

    return (
        <>
            {(error) && <h2>Oh no, an error occured!</h2>}
            {(!error && loading) && <h2>Loading ...</h2>}
            {(!error && !loading) && (
                <>
                    <h1 className='flex justify-center text-2xl text-center py-5'>Highscores</h1>
                    <div className='flex justify-center'>
                        <table className='justify-center divide-y w-full'>
                            <thead>
                                <tr className=''>
                                    <th className='text-right py-2 pr-4 text-lg'>Rank</th>
                                    <th className='text-left py-2 pr-2 text-lg'>Player</th>
                                    <th className='text-right py-2 pr-2 text-lg'>Score</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y'>
                                {
                                    players.map((player, index) => {
                                        return (
                                            <tr key={player._id} className={`${(index % 2 === 0) && ('bg-skyblue')}`}>
                                                <td className='text-right py-2 pr-4 text-lg'>{index + 1}</td>
                                                <td className='text-left py-2 pr-2 text-lg'>{player._id}</td>
                                                <td className='text-right py-2 pr-2 text-lg'>{player.score}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </>
            )
            }
        </>
    )
}

export default Highscores