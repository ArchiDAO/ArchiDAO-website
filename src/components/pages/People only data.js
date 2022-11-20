import * as csv from 'csvtojson';
import React, { useState , useEffect} from 'react';
import './People.css';



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
        <>
        <div className="people">
            
            <p className='ppeople' >A 3D tale of who we are.</p>
            <p className='ppeople' >Join us <a href='https://forms.gle/HcWnT64o79awMsfk9' style={{ color: 'chocolate'  }}>here</a> and become a part of the future.</p>
            
                <div className="person">
                {data.map((person) => (
                    <div className='person__data' key={person.nationality}>
                        <h3 >{person.name}</h3>
                    </div>))}
           </div>
           </div>
           
           </>
           
           )
}
 
  
  
/////////////////////////////////////////end


    // return info.map(item => (
    //   <mesh ref={ref} key={item.nomes} castShadow receiveShadow  >
    //     <sphereGeometry />
    //         <meshStandardMaterial>
    //         <RenderTexture attach="map" anisotropy={16}>
    //         <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 5]} />
    //         <color attach="background" args={['orange']} />
    //         <ambientLight intensity={0.5} />
    //         <directionalLight position={[10, 10, 5]} />
    //         <Text  fontSize={4} color="#555">
    //           {item.nomes}
    //         </Text>
    //         </RenderTexture>
    //      </meshStandardMaterial>
    //   </mesh>
      
    // ))