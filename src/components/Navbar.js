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
        }
        else {
            setBurguerClass('burguer-bar unclicked');
            setMenuClass('menu hidden');
        }
    }



    return(
        <div>
            <nav>
                <div className="burguer-menu" onClick={updateMenu}>
                    <div className={burguer_class} ></div>
                    <div className={burguer_class}> </div>    
                    <div className={burguer_class}></div>           
                </div>
                    </nav>
        </div>
    )
    }