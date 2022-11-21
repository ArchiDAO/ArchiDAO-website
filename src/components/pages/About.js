//TÍTULO
//INTRO
//HEAD
//BODY
//3D
//FOOTER

import React from 'react';
import './About.css';
import Footer from '../Footer';
// import Particles from './components/Particles';

export default function About() {
    return (
        <>
        <div className="about">
        {/* <Particles /> */}
            <div className="about__container">
                <h1 className="about__title">ABOUT</h1>
                <div className="about__content">
                    <p>Hello! We are</p>
                    <div className='first__row'>
                        <div className='about__subtitle'>ARCHIDAO</div>
                        <p className="about__text1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        </p> 
                    </div>
                    <div className='second__row'>
                        <p className="about__text2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                              </p>
                        <div className='particles__container'>
                       
                        </div>
                    </div>
                </div>              
            </div>
        </div>
        <Footer />

        </>
    );
    }


