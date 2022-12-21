import React from 'react';
import './Learn.css';
import Footer from '../Footer';
// import Particles from './components/Particles';

export default function Learn() {
    return (
        <>
        <div className="about">
        {/* <Particles /> */}
            <div className="about__container">
                <h1 className="about__title">LEARN</h1>
                <div className="about__content">
                    <p>Stay around to know at first hand about our future workshops.</p>
                    <div className='first__row'>
                        <div className='learn__subtitle'> N</div>
                        <p className="learn__text1">
                       o need to worry! <br/><br/>We have plenty of free content already live on our social media channels for you to learn about blockchain, web3.0, metaverse, architecture design, and more!
<br/>

                        </p> 
                    </div>
                    <div className='youtube__card__title'>Metaverse for Architects</div>
                    <div className='learn_second__row'>
                       {/* add a card for youtube videos */}
                       
                            <div className='youtube__card'>
                                
                                <div className='youtube__card__link'>
                                {/* embbed thumbnail for https://www.youtube.com/watch?v=FDmidiL0W4s */}
                                <a href="https://www.youtube.com/watch?v=FDmidiL0W4s">
                                    <img className='youtube_thumb' src="https://i.ytimg.com/an_webp/FDmidiL0W4s/mqdefault_6s.webp?du=3000&sqp=CO-PjZ0G&rs=AOn4CLAgtjTKyMdZX7UlEffPD7THlpEtFw" alt="Thumbnail do vídeo do YouTube" />
                                </a>
                                </div>
                                <div className='youtube__card__description'>A full Decentraland Metaverse Workshop</div>
                            </div>
                            <div className='youtube__card'>
                                
                                <div className='youtube__card__link'>
                                {/* embbed thumbnail for https://www.youtube.com/watch?v=FDmidiL0W4s */}
                                <a href="https://www.youtube.com/watch?v=a91eSabwZ6E">
                                    <img className='youtube_thumb' src="https://i.ytimg.com/an_webp/a91eSabwZ6E/mqdefault_6s.webp?du=3000&sqp=CO3ajZ0G&rs=AOn4CLDwOWCp48p40iNaoj8KaRiHJy1pFA" alt="Thumbnail do vídeo do YouTube" />
                                </a>
                                </div>
                                <div className='youtube__card__description'>Mozilla Hubs: Create your own open source Metaverse space</div>
                            </div>
                            

                            <div className='youtube__card'>
                                
                                <div className='youtube__card__link'>
                                {/* embbed thumbnail for https://www.youtube.com/watch?v=FDmidiL0W4s */}
                                <a href="https://www.youtube.com/watch?v=JW0YriVBDB8">
                                    <img className='youtube_thumb' src="https://i.ytimg.com/an_webp/JW0YriVBDB8/mqdefault_6s.webp?du=3000&sqp=COuijZ0G&rs=AOn4CLDSU-GhSQtqjh2oWLVMZKd9PP797A" alt="Thumbnail do vídeo do YouTube" />
                                </a>
                                </div>
                                <div className='youtube__card__description'>Mona Metaverse Crash Course</div>
                            </div>


                       
                    </div>
                </div>              
            </div>
        </div>
        <Footer />

        </>
    );
    }


