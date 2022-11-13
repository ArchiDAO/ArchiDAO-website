import * as THREE from 'three'
import { useRef , useState , Suspense} from 'react'
import { RGBELoader } from 'three-stdlib'
import { Canvas, useFrame,  useLoader } from '@react-three/fiber'
import { useFBO, Center, Text3D, Instance, Instances, Environment, Lightformer, OrbitControls, RandomizedLight, AccumulativeShadows } from '@react-three/drei'
import { useControls, button } from 'leva'
import { MeshRefractionMaterial } from '../shaders/MeshRefractionMaterial'
// import { LayerMaterial, Depth, Noise } from 'lamina'


function Rig({ v = new THREE.Vector3() }) {
    return useFrame((state) => {
      state.camera.position.lerp(v.set(state.mouse.x / 2 + 6, state.mouse.y / 2, 6), 0.05)
    })
  }


function ColorText(props) {

// const ref = useRef()
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)
// useFrame((state, delta) => (ref.current.rotation.x += delta))
return (
  <Text3D 
  {...props}
   scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
  onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
  letterSpacing={0} height={0.02}size={0.4} font="/Inter_Medium_Regular.json" >
    {props.children}
  <meshStandardMaterial  color={hovered ? 'chocolate' : 'black'} />
</Text3D> 
    
    )
    }



export default function Header() {
  const { autoRotate, text, shadow, ...config } = useControls({
    text: '&',
    clearcoat: { value: 0.79, min: 0.1, max: 1 },
    clearcoatRoughness: { value: 0.26, min: 0, max: 1 },
    uRefractPower: { value: 0.15, min: 0, max: 5 },
    uTransparent: { value: 0.9, min: 0, max: 5 },
    uIntensity: { value: 0.6, min: 0.0, max: 5.0 },
    uNoise: { value: 0.07, min: 0, max: 1, step: 0.01 },
    uSat: { value: 1.02, min: 1, max: 1.25, step: 0.01 },
    uColor: '#e26686',
    gColor: '#ff7a7a',
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
    <Suspense fallback={<div style={{width:'100%', height:'80%',position:'absolute', display:'flex', justifyContent:'center',alignItems:'center', letterSpacing:'0.7em' }}>LOADING...</div>} >
    <Canvas shadows orthographic camera={{ position: [20, 20, 20], zoom: 110, fov:22 }} gl={{ preserveDrawingBuffer: true }} dpr={[1,2]}>
      <color attach="background" args={['#f2f2f5']} />
     
      {/* <mesh scale={500}>
        <boxGeometry args={[2,2,2]} />
        <LayerMaterial side={THREE.BackSide}>
          <Depth colorB="pink" colorA="skyblue" alpha={0.4} mode="darken" near={130} far={500} origin={[100, 100, -100]} />
          <Noise mapping="local" type="white" scale={1000} colorA="green" colorB="pink" mode="normal" alpha={0.4} />
        </LayerMaterial>
      </mesh> */}
      {/** The text and the grid */}
      <Text config={config} rotation={[-Math.PI / 2, 0, -2.25]} position={[-1, -1, -5.2]}>
        {text}
      </Text>
      
        <ColorText rotation={[-Math.PI / 2, 0, Math.PI*2]} position={[-5, -1, -2]}>AEC tech</ColorText>
       <ColorText  rotation={[-Math.PI / 2, 0, Math.PI*2]} position={[-5, -1, -1]}>metaverse </ColorText>
      <ColorText  rotation={[-Math.PI / 2, 0, Math.PI*2]} position={[-5, -1, 0]}>web3 blockchain </ColorText>
      <ColorText  rotation={[-Math.PI / 2, 0, Math.PI*2]} position={[-5, -1, 1]}>products</ColorText>
      <ColorText  rotation={[-Math.PI / 2, 0, Math.PI*2]} position={[-5, -1, 2]}>education </ColorText> 
      {/** Controls */}
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
      {/** The environment is just a bunch of shapes emitting light. This is needed for the clear-coat */}
      <Environment resolution={32}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer intensity={10} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={20} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={10} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
          <Lightformer type="ring" intensity={10} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={10} />
        </group>
      </Environment>
      {/** Soft shadows */}
      <AccumulativeShadows
        temporal
        frames={100}
        color={shadow}
        colorBlend={5}
        toneMapped={true}
        alphaTest={0.9}
        opacity={1}
        scale={30}
        position={[0, -1.01, 0]}>
        <RandomizedLight amount={4} radius={10} ambient={0.5} intensity={1} position={[0, 10, -10]} size={15} mapSize={1024} bias={0.0001} />
      </AccumulativeShadows>
     <Rig />
    </Canvas>
    </Suspense>
  )
}

const Grid = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => (
  // Renders a grid and crosses as instances
  <Instances position={[0, -1.02, 0]}>
    <planeGeometry args={[lineWidth, height]} />
    <meshBasicMaterial color="#999" />
    {Array.from({ length: number }, (_, y) =>
      Array.from({ length: number }, (_, x) => (
        <group key={x + ':' + y} position={[x * 2 - Math.floor(number / 2) * 2, -0.01, y * 2 - Math.floor(number / 2) * 2]}>
          <Instance rotation={[-Math.PI / 2, 0, 0]} />
          <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </group>
      ))
    )}
    <gridHelper args={[100, 100, '#bbb', '#bbb']} position={[0, -0.01, 0]} />
  </Instances>
)

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
            scale={5}
            letterSpacing={-0.03}
            height={0.25}
            bevelSize={0.01}
            bevelSegments={10}
            curveSegments={128}
            bevelThickness={0.01}>
            {children}
            {/** Pass the rendered buffer into the refraction shader */}
            <MeshRefractionMaterial uSceneTex={fbo.texture} {...config} />
          </Text3D>
        </Center>
        <Grid />
      </group>
      {/** Double up the text as a flat layer at the bottom for more interesting refraction */}
      <Center scale={[0.8, 1, 1]} front top {...props}>
        <Text3D font={font} scale={5} letterSpacing={-0.03} height={0.01} curveSegments={32}>
          {children}
          <meshBasicMaterial color={config.gColor} />
        </Text3D>
      </Center>
    </>
  )
}

