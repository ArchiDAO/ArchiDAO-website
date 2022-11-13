import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar()  {

    const [burguer_class, setBurguerClass] = useState('burguer-bar unclicked')
    const [menu_class, setMenuClass] = useState('menu hidden');
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurguerClass('burguer-bar clicked');
            setMenuClass('menu visible');
            console.log('menu visible');
        }
        else {
            setBurguerClass('burguer-bar unclicked');
            setMenuClass('menu hidden');
            console.log('menu hidden');
        }
        setIsMenuClicked(!isMenuClicked);
    }



    return(
        <div >
            <nav>
                <div className="burguer-menu" onClick={updateMenu}>
                    <div className={burguer_class} > </div>
                    <div className={burguer_class}> </div>    
                    <div className={burguer_class}></div>           
                </div>
            </nav>
            
            <div className={menu_class}> 
                <div className='menuitems'>
                <ul >ABOUT</ul>
                <ul >PROJECTS</ul>
                <ul onClick={updateMenu}>+ GUILDS</ul>
                <ul>CONTACT</ul>
                <ul>PEOPLE</ul>
                </div>
            </div>
        </div>
    )
    }