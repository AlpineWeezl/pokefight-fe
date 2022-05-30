import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    useEffect(() => {
        setNavbarOpen(false);
    }, [])

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

    return (
        <nav className='flex justify-between text-3xl p-5 bg-darkblue text-white sticky top-0'>
            <div className='flex'>
                <NavLink to={'/'} className={`p-0`}><FontAwesomeIcon icon={faHouse} /></NavLink>
            </div>
            <div className='navBar align-middle flex'>
                <button onClick={handleToggle}>{navbarOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}</button>
                <ul className={`px-5 flex flex-col justify-around align-middle bg-lightblue rounded text-lg text-white uppercase list-none inline menuNav ${navbarOpen ? "showMenu" : ""}`} >
                    <li className='navItem flex align-middle'>
                        <NavLink to={'/'} className={(
                            { isActive }) => (
                            isActive ? 'font-bold ' : 'font-normal'
                        )}>Home</NavLink>
                    </li>
                    <li className='navItem flex align-middle'>
                        <NavLink to={'/pokemon'} className={(
                            { isActive }) => (
                            isActive ? 'font-bold' : 'font-normal'
                        )}>Pokedex</NavLink>
                    </li>
                    <li className='navItem'>
                        <NavLink to={'/highscores'} className={(
                            { isActive }) => (
                            isActive ? 'font-bold' : 'font-normal'
                        )}>Highscores</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;