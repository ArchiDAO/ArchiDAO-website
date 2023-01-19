//TÍTULO
//INTRO
//HEAD
//BODY
//3D
//FOOTER

import React, { useState, useEffect } from 'react';
import './About.css';
import Footer from '../Footer';
import Barista from '../images/cryptobarista.png';
import Bitscrunch from '../images/bitscrunch.png';
// import Particles from './components/Particles';



export default function About() {

    useEffect(() => {
        const interval = setInterval(changeImage, 2000);
        return () => clearInterval(interval);
      }, [changeImage]);

const [currentImage, setCurrentImage] = useState(1);

const changeImage = () => {
    setCurrentImage(currentImage === 2 ? 1 : currentImage + 1);
  }

const images = [
    { id: 1, src: Barista },
    { id: 2, src: Bitscrunch }  ];

  const currentSrc = images.find(img => img.id === currentImage).src;


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
                        We aim to push the boundary in the AEC (architecture, engineering & construction) Industry with a blockchain and web 3.0 native approach.
<br/>
ArchiDAO is focused on developing web3 integrated solutions in metaverse and blockchain in both physical & digital domains.
                        </p> 
                    </div>
                    <div className='second__row'>
                        <p className="about__text2">
                        We are a group of architects, engineers, developers, and designers who are passionate about the future of the AEC industry. We are building a community of like-minded individuals who are interested in the future of the AEC industry and are willing to contribute to the development of the industry.
                              <br/> <br/> Some of our partners are Futurly, Bitscrunch, Crypto Barista, CityDAO and CabinDAO.</p>
                        <div className='partners'>
                        <img src={currentSrc} alt="Carousel image" /> 
                        </div>
                    </div>
                </div>              
            </div>
        </div>
        <Footer />

        </>
    );
    }


