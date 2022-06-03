import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Highscores = () => {
    const [players, setPlayers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiString = `${process.env.REACT_APP_POKEFIGHT_API}/highscores`; // <-- nachschauen, welcher Endpunkt
        axios
            .get(apiString)
            .then(res => {
                setPlayers(res.data.sort((a, b) => a.points - b.point));
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
                    <h1>Highscores</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>User</th>
                                <th>Points</th>
                                <th>Played</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                players.map((player, index) => {
                                    return (
                                        <tr key={player._id}>
                                            <td>{index + 1}</td>
                                            <td>{player.name}</td>
                                            <td>{player.points}</td>
                                            <td>{player.played}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </>
            )
            }
        </>
    )
}

export default Highscores