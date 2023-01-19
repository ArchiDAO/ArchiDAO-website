import React, { useState , Suspense} from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import Logo from './images/logo.png';


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
                    <div className={burguer_class}> </div>           
                </div>
            </nav>
            
            <div className={menu_class}> 
                <div className='menuitems' onClick={updateMenu}>
               
                     <li className='menuItem'><Link style={{color:'white'}} to="/About" >ABOUT</Link></li>
                     {/* <li className='menuItem'><Link style={{color:'white'}}to="/Projects" >PORTFOLIO</Link></li> */}
                     
                    <li className='menuItem'><Link style={{color:'white'}} to="/">+ GUILDS</Link></li>
          
                    <li className='menuItem'><Link style={{color:'white'}} to="/Contact">CONTACT</Link></li>
                   <li className='menuItem'> <Link style={{color:'white'}} to="/People">WE</Link></li>
                   {/* <li className='menuItem'> <Link style={{color:'white'}} to="/Dashboard">MEMBER AREA</Link></li> */}
                   <img className="logo" src={Logo} alt="logo" />
                  
                </div>
            </div>
           
        </div>
    )
    }