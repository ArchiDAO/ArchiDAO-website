import * as THREE from "three"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { Physics, useSphere } from "@react-three/cannon"
import { Sky, Environment, Effects as EffectComposer, useTexture } from "@react-three/drei"
import { SSAOPass } from "three-stdlib"
import React, { useState , useEffect} from 'react';

import * as csv from 'csvtojson';

extend({ SSAOPass })

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const baubleMaterial = new THREE.MeshStandardMaterial({ color: "red", roughness: 0, envMapIntensity: 0.2, emissive: "#370037" })
let count = 10;

// colors=['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']

csv({
  output: "csv",
});
const url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTSl1iJs_f8SxUon33W-VoCxwnv7vY4VzFwSaCJ7dirEMLA2pvnWmSN4pgylc_S0805Mf9AaTEdJNp/pub?output=csv";




  export default function People() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(url)
        .then((response) => response.text())
        .then((data) => {
            const people = data
            .split("\n")
            .slice(1)
            .map((row) => {
                const columns = row.split(",");
                const time = columns[0];
                const email = columns[1];
                const name = columns[2];
                const discord = columns[3];
                const nationality = columns[4];
                const city = columns[5];
                const timezone = columns[6];
                const age = columns[7];
                const social = columns[8];
                const profession = columns[9];
                const skillDiscord = columns[10];
                const skillDAO = columns[11];
                const skillNFT = columns[12];
                const skillVR = columns[13];
                const skillAR = columns[14];
                const skillFab = columns[15];
                const skillSC = columns[16];
                const skillMV = columns[17];
                const skillWeb = columns[18];
                const skillAI = columns[19];
                const skillPD = columns[20];
                const interests = columns[21];
                const ethereum = columns[22];
                const skillBIM = columns[23];
                const skillDesign = columns[24];

                return { time , email, name, discord, nationality, city, timezone, age, social, profession, skillDiscord
                 , skillDAO, skillNFT, skillVR, skillAR, skillFab, skillSC, skillMV, skillWeb, skillAI, skillPD, interests, ethereum, skillBIM, skillDesign };
            }
            );
            setData(people);
            setLoading(false);
            console.log(people);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        }
        );
    }, []);

    if (loading) return "Loading...";
    if (error) return "Error!";
    return (
  <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}>
    <ambientLight intensity={0.25} />
    <spotLight intensity={1} angle={0.2} penumbra={1} position={[30, 30, 30]} castShadow shadow-mapSize={[512, 512]} />
    <directionalLight intensity={5} position={[-10, -10, -10]} color="purple" />
    <Physics gravity={[0, 2, 0]} iterations={10}>
      {/* <Pointer /> */}
      <Clump />
    </Physics>
    <Environment files="/adamsbridge.hdr" />
    {/* <Effects /> */}
    <Sky />
  </Canvas>
)}

function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
  const texture = useTexture("/noise.jpg")
  const [ref, api] = useSphere(() => ({ args: [1], mass: 1, angularDamping: 0.1, linearDamping: 0.65, position: [rfs(20), rfs(20), rfs(20)] }))

  useFrame((state) => {
    for (let i = 0; i < count; i++) {
      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat)
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-50).toArray(), [0, 0, 0])
    }
  })

  
  return (
 
 <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, people.length]} geometry={sphereGeometry} material={baubleMaterial} material-map={texture} /> 
)}





function Pointer() {
  const viewport = useThree((state) => state.viewport)
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [3], position: [0, 0, 0] }))
  return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0))
}

function Effects(props) {
  const { scene, camera } = useThree()
  return (
    <EffectComposer {...props}>
      <sSAOPass args={[scene, camera, 100, 100]} kernelRadius={1.2} kernelSize={0} />
    </EffectComposer>
  )
}


// export default People;