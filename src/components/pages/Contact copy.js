import React from "react";
import Footer2 from "../Footer2";
import "./Contact.css";
import * as THREE from 'three'
import { useRef , useState , Suspense} from 'react'
import { RGBELoader } from 'three-stdlib'
import { Canvas, useFrame,  useLoader } from '@react-three/fiber'
import { useFBO, Center, Text3D, Instance, Instances, Environment, Lightformer, OrbitControls, RandomizedLight, AccumulativeShadows, Html, MeshDistortMaterial } from '@react-three/drei'

import { useGLTF, Bounds, Edges } from '@react-three/drei'
// use ↓ "DebugLayerMaterial as LayerMaterial" ↓ here for integrated leva debug panels
import { LayerMaterial, Depth, Fresnel } from 'lamina'
import { useControls } from 'leva'

export default function Contact() {
    const { autoRotate, text, shadow, ...config } = useControls({
        text: '&',
        clearcoat: { value: 1, min: 0.1, max: 1 },
        clearcoatRoughness: { value: 0.2, min: 0, max: 1 },
        uRefractPower: { value: 1.45, min: 0, max: 5 },
        uTransparent: { value: 0.19, min: 0, max: 5 },
        uIntensity: { value: 0.6, min: 0.0, max: 5.0 },
        uNoise: { value: 0.04, min: 0, max: 1, step: 0.01 },
        uSat: { value: 1.02, min: 1, max: 1.25, step: 0.01 },
        uColor: '#e26686',
        gColor: '#bea8a8',
        shadow: '#80446c',
        autoRotate: false,
          })
      return (
        
  <div className="contact-container">
 
      <div className="contact-hero"> Have a project? <br/> We would love to help. </div>
     
      <div className='form-container'>
    
      
      </div>

      <div className='canvas-contact'>
        <Suspense fallback={null} >
        <Canvas shadows orthographic camera={{ position: [20, 20, 20], zoom: 200, fov:110 }} gl={{ preserveDrawingBuffer: true }} dpr={[1,2]}>
          {/* <color attach="background" args={['#f2f2f5']} /> */}
         
          <Text config={config} rotation={[-Math.PI / 2, 0, -2.25]} position={[-1, -1, 0]}>
            {text}
          </Text>
          <OrbitControls />
        </Canvas>
        </Suspense>
    </div>
    <Footer2 />
      </div>
        )
    }



   

    function Text(props) {
      const ref = useRef()
           const { gradient } = useControls({ gradient: { value: 0.7, min: 0, max: 1 } })
    
      // Animate gradient
      useFrame((state) => {
        const sin = Math.sin(state.clock.elapsedTime / 2)
        const cos = Math.cos(state.clock.elapsedTime / 2)
        ref.current.layers[0].origin.set(cos / 2, 0, 0)
        ref.current.layers[1].origin.set(cos, sin, cos)
        ref.current.layers[2].origin.set(sin, cos, sin)
        ref.current.layers[3].origin.set(cos, sin, cos)
      })
    
      return (
        <mesh {...props} >
          <Text3D ref={ref} fontSize={1} font="https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2">
          <LayerMaterial ref={ref} toneMapped={false}>
            <Depth colorA="#ff0080" colorB="black" alpha={1} mode="normal" near={0.5 * gradient} far={0.5} origin={[0, 0, 0]} />
            <Depth colorA="blue" colorB="#f7b955" alpha={1} mode="add" near={2 * gradient} far={2} origin={[0, 1, 1]} />
            <Depth colorA="green" colorB="#f7b955" alpha={1} mode="add" near={3 * gradient} far={3} origin={[0, 1, -1]} />
            <Depth colorA="white" colorB="red" alpha={1} mode="overlay" near={1.5 * gradient} far={1.5} origin={[1, -1, -1]} />
            <Fresnel mode="add" color="white" intensity={0.5} power={1.5} bias={0.05} />
          </LayerMaterial>
          <Edges color="white" />
          </Text3D>
        </mesh>
      )
    }