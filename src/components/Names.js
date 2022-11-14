import * as csv from 'csvtojson';
import React, { useState , useEffect} from 'react';
import './pages/People.css';

csv({
    output: "csv",
  });
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTSl1iJs_f8SxUon33W-VoCxwnv7vY4VzFwSaCJ7dirEMLA2pvnWmSN4pgylc_S0805Mf9AaTEdJNp/pub?output=csv";


export default function Names() {

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
                              const name = columns[2];
              
                return {name}
            }
            );
            setData(people);
            setLoading(false);
            // console.log(people);

            data.map((person) => (
                person.name))
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        }
        );
    }, []);

    // if (loading) return "Loading...";
    // if (error) return "Error!";
    return (<>
    {console.log(data)}</>         
           )
}