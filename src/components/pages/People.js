
import React, { useState , useEffect} from 'react';
import ReadRemoteFile from '../ParseRemote';
import Footer from "../Footer"
import './People.css';
import PeopleNames from './People only data';
import {Link} from 'react-router-dom';


export default function People() {

    
  
  return(
      <>
      <div className="people">
            
            <p className='ppeople' >A 3D tale of who we are.</p>
                <p className='ppeople' >Join us <a href='https://forms.gle/HcWnT64o79awMsfk9' style={{ color: 'chocolate'  }}>here</a> and become a part of the future.</p>
                <p className='ppeople'>Professions | <Link to='../locations'>Locations</Link> </p>
                </div>
                 <div className='canva-container'>
                    <ReadRemoteFile/>
                </div>
                
            <Footer />
      </>
  )
}