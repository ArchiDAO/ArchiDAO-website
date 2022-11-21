
import React, { useState , useEffect} from 'react';
import ReadRemoteFile from '../ParseRemote';
import Footer from "../Footer"
import './People.css';
import PeopleNames from './People only data';


export default function People() {

  const [professionClass, setProfessionClass] = useState('hidden')  //canva-container
  const [nameClass, setNameClass] = useState('hidden')  //canva-container

  
  
  return(
      <>
      <div className="people">
            
            <p className='ppeople' >A 3D tale of who we are.</p>
                <p className='ppeople' >Join us <a href='https://forms.gle/HcWnT64o79awMsfk9' style={{ color: 'chocolate'  }}>here</a> and become a part of the future.</p>
                <p className='ppeople' >Professions </p>
                </div>
                 <div className='canva-container'>
                    <ReadRemoteFile/>
                </div>
                <div className={nameClass}>
                    <PeopleNames />
                </div>
            <Footer />
      </>
  )
}