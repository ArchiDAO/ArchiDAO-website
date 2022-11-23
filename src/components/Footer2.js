import React, { useState , Suspense} from 'react';
import './Footer.css';
import { Link } from "react-router-dom";


export default function Footer2()  {

    return(
        <div className="footer-top">
           
                <div className='logo-footer-top' > <Link to={'../home'} style={{color:'white', fontWeight:'bold'}} > ARCHIDAO </Link></div>
                <div className='footer-items-top'>
                    <div className='footer-contact-top'>
                    <div style={{color:'white'}}>contact &#8594;  
                    <a  href="mailto:archidao.io@gmail.com" >  email@archidao.io</a></div></div>
                  
                    <div className='footer-item-top'>
                    <div><a className='footer-item'  href="https://www.instagram.com/archidao.io/" target="_blank"  >instagram</a></div>                 
                    <div><a  className='footer-item' href="https://twitter.com/archi_dao" target="_blank" >twitter</a></div>
                    <div><a className='footer-item'href="https://www.linkedin.com/company/archidao-io/CGj" target="_blank" >linkedin</a></div>
                    <div> <a  className='footer-item'  href="https://discord.gg/rVR4YAmCGj" target="_blank" >discord</a></div>
                    <div> <a className='footer-item'  href="https://www.youtube.com/channel/UCm08iRIcqpqzgIcva7gUFHg/featured" target="_blank" >youtube</a></div>
                    </div>
                </div>
    
        </div>

    )
    }
