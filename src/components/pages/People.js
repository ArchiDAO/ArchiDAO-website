import * as THREE from "three"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { Physics, useSphere } from "@react-three/cannon"
import { Sky, Environment, Effects as EffectComposer, useTexture } from "@react-three/drei"
import { SSAOPass } from "three-stdlib"
import React, { useState , useEffect} from 'react';
import ReadRemoteFile from '../ParseRemote';
import Footer from "../Footer"
import './People.css';


export default function People() {
  return(
      <>
      <div className="people">
            
            <p className='ppeople' >A 3D tale of who we are.</p>
                <p className='ppeople' >Join us <a href='https://forms.gle/HcWnT64o79awMsfk9' style={{ color: 'chocolate'  }}>here</a> and become a part of the future.</p>
                </div>
                 <div className="canva-container">
           <ReadRemoteFile />
            </div>
            <Footer />
      </>
  )
}