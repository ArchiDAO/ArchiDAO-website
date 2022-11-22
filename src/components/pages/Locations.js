import React, { Suspense } from 'react';
import Footer from '../Footer';
import { Html } from '@react-three/drei';
 import Earth from '../Earth';
 import {Link} from 'react-router-dom';




function Locations() {
  return (
    <>
    <div className="people">
            
            <p className='ppeople' >A 3D tale of who we are.</p>
                <p className='ppeople' >Join us <a href='https://forms.gle/HcWnT64o79awMsfk9' style={{ color: 'chocolate'  }}>here</a> and become a part of the future.</p>
                <p className='ppeople'><Link to='../people'>Professions</Link> | Locations </p>
                </div>
                 <div className='canva-container'>
                 <Suspense fallback={<Html>loading...</Html>}>
                    <Earth/>   
                    </Suspense>
                </div>
          <Footer/>  
 
    </>
  );
}


export default Locations;