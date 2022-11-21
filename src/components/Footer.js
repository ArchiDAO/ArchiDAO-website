import React, { useState , Suspense} from 'react';
import './Footer.css';
import { Link } from "react-router-dom";


export default function Footer()  {

    return(
        <div className="footer">
           
                <div className='logo-footer'> ARCHIDAO </div>
                <div className='footer-items'>
                    <div>contact &#8594;  
                    <a href="mailto:archidao.io@gmail.com" style={{color:'white'}}  >  email@archidao.io</a></div>
                    <div><a style={{color:'gray'}}  href="https://www.instagram.com/archidao.io/" target="_blank"  >instagram</a></div>                 
                    <div><a  style={{color:'gray'}}   href="https://twitter.com/archi_dao" target="_blank" >twitter</a></div>
                    <div><a style={{color:'gray'}}   href="https://www.linkedin.com/company/archidao-io/CGj" target="_blank" >linkedin</a></div>
                    <div> <a  style={{color:'gray'}}  href="https://discord.gg/rVR4YAmCGj" target="_blank" >discord</a></div>
                    <div> <a  style={{color:'gray'}}  href="https://www.youtube.com/channel/UCm08iRIcqpqzgIcva7gUFHg/featured" target="_blank" >youtube</a></div>
                </div>
    
        </div>

    )
    }
