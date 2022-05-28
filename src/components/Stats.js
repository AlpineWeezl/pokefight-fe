import React from 'react'

const Stats = ({ stats }) => {
    return (
        <>
            <table className='table-fixed text-right divide-y'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Basevalue</th>
                    </tr>
                </thead>
                <tbody className='divide-y'>

                    {
                        stats.map(stat => {
                            return (
                                <>
                                    <tr className='text-right'>
                                        <td>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</td>
                                        <td>{stat.base_stat}</td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Stats