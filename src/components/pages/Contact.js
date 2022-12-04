import React from "react";
import Footer2 from "../Footer2";
import "./Contact.css";
import * as THREE from 'three'
import { useRef , useState , Suspense} from 'react'
import { RGBELoader } from 'three-stdlib'
import { Canvas, useFrame,  useLoader } from '@react-three/fiber'
import { useFBO, Center, Text3D, Instance, Instances, Environment, Lightformer, OrbitControls, RandomizedLight, AccumulativeShadows, Html, MeshDistortMaterial } from '@react-three/drei'
import { useControls, button } from 'leva'
import { MeshRefractionMaterial } from '../../shaders/MeshRefractionMaterial'

function Rig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    state.camera.position.lerp(v.set(state.mouse.x / 5 + 2, state.mouse.y / 5, 2), 0.05)
   
  })
}


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
        screenshot: button(() => {
          // Save the canvas as a *.png
          const link = document.createElement('a')
          link.setAttribute('download', 'canvas.png')
          link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
          link.click()
        })
      })
      return (
        
  <div className="contact-container">
      <div className="contact-hero"> Have a project? <br/> We would love to help. </div>
     
      <div className='form-container'>
        I'm interested in:
        <div className='form-areas'>
          <button >Metaverse</button>
          <button>Blockchain</button>
          <button>Web3</button>
          <button>Digital Fabrication</button>
          <button>AI</button>
          <button>Design</button>
        </div>
        <div className='form-inputs'>
          <div className='form-input'> <input type="text" placeholder="Name" /> </div>
          <div className='form-input'> <input type="text" placeholder="Email" /> </div>
          <div className='form-input'> <input type="text" placeholder="Tell us about your project" /> </div>
          </div>
          <button className='form-button'>SEND</button>
      </div>

      <div className='canvas-contact'>
        <Suspense fallback={null} >
        <Canvas shadows orthographic camera={{ position: [20, 10, 20], zoom: 220, fov:110 }} gl={{ preserveDrawingBuffer: true }} dpr={[1,2]}>
          {/* <color attach="background" args={['#f2f2f5']} /> */}
          <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={-0.1}
        zoomSpeed={0.25}
        // minZoom={40}
        // maxZoom={140}
        enableZoom={false}
        enablePan={false}
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
      />
          <Text config={config} rotation={[0, 1.1, -2.1]} position={[-1, -1, 0]}>
            {text}
          </Text>
          <Environment resolution={32}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer intensity={10} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={20} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={10} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
          <Lightformer type="ring" intensity={10} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={10} />
        </group>
      </Environment>
      <AccumulativeShadows
        temporal
        frames={100}
        color={shadow}
        colorBlend={5}
        toneMapped={true}
        alphaTest={0.9}
        opacity={0.5}
        scale={30}
        position={[0, -1.5, 0]}>
        <RandomizedLight amount={4} radius={10} ambient={0.5} intensity={1} position={[0, 10, -10]} size={15} mapSize={1024} bias={0.0001} />
      </AccumulativeShadows>
          <Rig />
        </Canvas>
        </Suspense>
    </div>
    <Footer2 />
      </div>
        )
    }



   

    function Text({ children, config, font = '/Inter_Medium_Regular.json', ...props }) {
        const ref = useRef()
        const fbo = useFBO(1024)
        const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')
      
        let oldBg
        useFrame((state) => {
          // Hide the outer groups contents
          ref.current.visible = false
          // Set render target to the local buffer
          state.gl.setRenderTarget(fbo)
          // Save the current background and set the HDR as the new BG
          // This is what creates the reflections
          oldBg = state.scene.background
          state.scene.background = texture
          // Render into the buffer
          state.gl.render(state.scene, state.camera)
          // Set old state back
          state.scene.background = oldBg
          state.gl.setRenderTarget(null)
          ref.current.visible = true
        })
      
        
        
      
        return (
          <>
            <group ref={ref}>
              <Center scale={[0.8, 1, 1]} front top {...props}>
                <Text3D
                  castShadow
                  bevelEnabled
                  font={font}
                  scale={1}
                  letterSpacing={-0.03}
                  height={0.3}
                  bevelSize={0.01}
                  bevelSegments={10}
                  curveSegments={128}
                  bevelThickness={0.02}>
                  &
                  {/** Pass the rendered buffer into the refraction shader */}
                  <MeshRefractionMaterial uSceneTex={fbo.texture} {...config} />
                  
                </Text3D>
              </Center>
               </group>
          </>
        )
      }    