import React, { Suspense, useState, useEffect } from 'react';
import { useTransition } from 'react'
import { useControls } from 'leva'

import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Center, Text3D, Environment, OrbitControls } from '@react-three/drei'

import { usePapaParse } from 'react-papaparse';


export default function ReadRemoteFile() {
  const { readRemoteFile } = usePapaParse();
  const [people, setPeople] = React.useState([]);
  const [profissao, setProfissao] = React.useState([]);
const [countries, setCountries] = React.useState([]);

  useEffect(() => { 

    handleReadRemoteFile()

  }, []);



  const handleReadRemoteFile = () => {
    readRemoteFile('https://docs.google.com/spreadsheets/d/e/2PACX-1vRZug-J1uFyDjuCVx1EOMfKEKDyL_usSGBzRgvGGUuBEOFZyJZ7iSS5nI3HZCasYsXpQVdB45Xm5YnB/pub?output=csv', {
      complete: (results) => {
                     const rows = results.data;
          const header = rows[0];
        const data = rows.slice(1);
           const people = data.map((row) => {
          return row.reduce((obj, value, index) => {
            obj[header[index]] = value;
            return obj;
          }, {});
        }
        );
        people.map((person) => {
          setPeople((people) => [...people, person]);
        }
        );


        const countries = {};
        people.forEach((person) => {
          countries[person.nationality] = (countries  [person.nationality] || 0) + 1;
        });
        setCountries(countries);
        console.log(countries)

        const profissao = {};
        people.forEach((person) => {
          profissao[person.profession] = (profissao  [person.profession] || 0) + 1;
        });

          //order by value
          const sortable = Object.fromEntries(
            Object.entries(profissao).sort(([,a],[,b]) => b-a)
          );
          setProfissao(sortable);


        // setProfissao(profissao);
        console.log(profissao);

      },
    });
  };



return (
  <Suspense>
      <Canvas shadows  camera={{ position: [0, 0, 4.5], fov: 100 }}>
      <group position={[-2, -0.65, 0]}>
      <Center top>
      <mesh castShadow rotation={[-Math.PI / 2, 0, Math.PI*2]} >
         {Object.keys(profissao).map((key) => (
          <Text3D key={key} position={[0,- Object.keys(profissao).indexOf(key)/5, 0]} 
          fontSize={4} letterSpacing={0} height={Math.log10(profissao[key])+0.5} 
          size={0.2} font="/Bold.json"
          castShadow >
          {key}
          <meshStandardMaterial metalness={1} roughness={0.35} />
            </Text3D>
           ))}</mesh>
    </Center>
        <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
          <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
        </AccumulativeShadows>
      </group>
      <Env />
      <OrbitControls 
      autoRotate autoRotateSpeed={0.2} enablePan={true} enableZoom={true} minPolarAngle={Math.PI /10} maxPolarAngle={Math.PI / 1} 
      />
    </Canvas> 

</Suspense>

)


}


function Env() {
  const [preset, setPreset] = useState('sunset')
  // You can use the "inTransition" boolean to react to the loading in-between state,
  // For instance by showing a message
  const [inTransition, startTransition] = useTransition()
  const { blur } = useControls({
    blur: { value: 0.65, min: 0, max: 1 },
    preset: {
      value: preset,
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
      // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
      // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
      // That way we can hang onto the current environment until the new one has finished loading ...
      onChange: (value) => startTransition(() => setPreset(value))
    }
  })
  return <Environment preset={preset} background blur={blur} />
}




///////////////////////////////

      {/* <mesh castShadow rotation={[-Math.PI / 2, 0, Math.PI*2]} >
  {Object.keys(profissao).map((key) => (
  <Text3D key={key} position={[0, key.length, 0]} 
  fontSize={10} letterSpacing={0} height={profissao[key]*0.2} 
  size={0.4} font="/Inter_Medium_Regular.json"
  castShadow >
  {key}
  <meshStandardMaterial metalness={1} roughness={0.35} />
     </Text3D>
   ))}</mesh> */}