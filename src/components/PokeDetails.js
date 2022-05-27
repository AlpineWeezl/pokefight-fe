import React, { useEffect } from 'react'

const PokeDetails = ({ name, selectedPokemon }) => {
    return (
        <div className='relative w-screen {!show ? hidden : }'>
            <h3>Details</h3>
            <h4>selectedPokemon.id</h4>
        </div>
    )
}

export default PokeDetails;