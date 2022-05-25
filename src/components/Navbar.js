import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='flex justify-between'>
            <div>
                <NavLink to={'/'}><i className='fa-solid fa-house'></i></NavLink>
            </div>
            <div>
                <ul className='list-none inline'>
                    <li>Pokedex</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar