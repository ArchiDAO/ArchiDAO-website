import React, { useEffect } from 'react';
import Footer2 from '../Footer2';
import './Portfolio.css';


import { usePapaParse } from 'react-papaparse';


export default function Portfolio() {
  const { readRemoteFile } = usePapaParse();
  const [data, setData] = React.useState([]);


  useEffect(() => { 

    handleReadRemoteFile()

  }, []);



  const handleReadRemoteFile = () => {
    readRemoteFile('https://docs.google.com/spreadsheets/d/e/2PACX-1vRXufQmY2B_Xaae2p7b07iOllRiksINd1AeyRCzu9ZiplL_E5hfo99OFqYi1c5E5K74ObQ6jddzl9pn/pub?output=csv', {
      complete: (results) => {
        const rows = results.data;     
        const validRows = rows.slice(1)  
       


        setData(validRows)
      }
    }); 
    }

         


return (<>
    {/* <Footer2 /> */}
<div className='Portfolio_main'>
{data.map((info) => {
    return (<>
      {/* <img src={info[6]} alt='project_image' className='project_image'/> */}

        <div className='project_card' style={
            {backgroundImage: `url(${info[6]})`}
        }>
            <div className='project_info'>
            <h1 className='project_title' >{info[0]}</h1>
            <h3>Client {info[1]}</h3>
            {/* <h3>{info[2]}</h3> */}
            <h4>{info[3]}</h4>
            </div>
            <div className='project_description'>
            <h4 >{info[8]}</h4>
            <a href={info[7]} target='_blank' rel="noreferrer" className='project_link'>Link to project</a>
            </div>
         

        </div> </>)
})}

</div>
</>
)
 


}
