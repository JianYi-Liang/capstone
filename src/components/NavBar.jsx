import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';


function Nav (){
    return (
        <header>
        <h2>ReHabit</h2>
            <nav>
                <ul>
                    <li><button><Link to="/">Home</Link></button></li>
                    <li><button><Link to="/map">Search</Link></button></li>
                    <li><button><Link to="/about">About Us</Link></button></li>
                </ul>
            </nav>
        </header>
    );
}

export default Nav;