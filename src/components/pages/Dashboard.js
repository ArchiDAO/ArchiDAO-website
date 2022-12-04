import React, { Suspense, useEffect, useState } from 'react';
import Footer2 from '../Footer2';
import Web3 from 'web3';
import { CONTRACT_ADDRESS, CONTRACT_ABI  } from '../../config';
import './dashboard.css';
import { Formik } from 'formik';

export default function Dashboard() {
    const [account, setAccount] = useState();
    const [ideas, setIdeas] = useState([]);
    const [ideaContract, setIdeaContract] = useState();
    
    useEffect(() => {
      async function load(){
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        const ideaContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        setIdeaContract(ideaContract);
        const counter = await ideaContract.methods.count().call();
        for (let i=1; i<=counter; i++){
          const idea = await ideaContract.methods.ideas(i).call();
          setIdeas(ideas => [...ideas, idea]);
        }
      }
      load();
    }, []);

    // function proposeIdea(){
    //     //create form
    //     const name = document.getElementById('name').value;
    //     const gain = document.getElementById('gain').value;
    //     const pmTimeEstimate = document.getElementById('pmTimeEstimate').value;
    //     const internalSupportNeed = document.getElementById('internalSupportNeed').value;
    //     const internalSupportHours = document.getElementById('internalSupportHours').value;
    //     const teamNeeded = document.getElementById('teamNeeded').value;
    //     const teamHours = document.getElementById('teamHours').value;
    //     ideaContract.methods.createIdea(name, gain, pmTimeEstimate, internalSupportNeed, internalSupportHours, teamNeeded, teamHours).send({from: account});        
    // }

   
    return (
        
        <div className="dash_container">
            
        <Formik
            initialValues={{ name: '', gain: '', 
            pmTimeEstimate: '', 
            internalSupportNeed: '', 
            internalSupportHours: '', 
            teamNeeded: '', 
            teamHours: '' }}
          //set values to variables
            onSubmit={async (values) => {
                const { name, gain, pmTimeEstimate, internalSupportNeed, internalSupportHours, teamNeeded, teamHours } = values;
                await ideaContract.methods.createIdea(name, gain, pmTimeEstimate, internalSupportNeed, internalSupportHours, teamNeeded, teamHours).send({from: account});  
            }}
            // onSubmit={async (values) => {
            //     await new Promise((r) => setTimeout(r, 500));
            //     alert(JSON.stringify(values, null, 2));
            // }
        // }
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form className="form_dash" onSubmit={handleSubmit}>
                    <h1 className="dash_header">Propose a new Idea or Project for the DAO</h1>
                                    <label htmlFor="name">Name</label>

                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    {errors.name && touched.name && errors.name}
                    <label htmlFor="gain">What the DAO/people will gain from the project?</label>

                    <input
                        type="text"
                        name="gain"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.gain}
                    />
                    {errors.gain && touched.gain && errors.gain}
                    <label htmlFor="pmTimeEstimate">How much time the manager is willing to put in the project?</label>

                    <input
                        type="text"
                        name="pmTimeEstimate"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pmTimeEstimate}
                    />
                    {errors.pmTimeEstimate && touched.pmTimeEstimate && errors.pmTimeEstimate}
                    <label htmlFor="internalSupportNeed">What kind of knowledge would be necessary for internal support?</label>

                    <input
                        type="text"
                        name="internalSupportNeed"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.internalSupportNeed}
                    />
                    {errors.internalSupportNeed && touched.internalSupportNeed && errors.internalSupportNeed}
                    <label htmlFor="internalSupportHours">How much time from the internal support would be necessary?</label>
                    <input
                        type="text"
                        name="internalSupportHours"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.internalSupportHours}
                    />
                    {errors.internalSupportHours && touched.internalSupportHours && errors.internalSupportHours}
                    <label htmlFor="teamNeeded">What kind of people would be necessary as a team, and how many hours?</label>
                    <input
                        type="text"
                        name="teamNeeded"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.teamNeeded}
                    />
                    {errors.teamNeeded && touched.teamNeeded && errors.teamNeeded}
                    <label htmlFor="teamHours">How much time from the team would be necessary?</label>
                    <input
                        type="text"
                        name="teamHours"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.teamHours}
                    />
                    {errors.teamHours && touched.teamHours && errors.teamHours}
                    <button type="submit" disabled={isSubmitting} >
                        Submit
                    </button>
                </form>
            )}
        </Formik>

       
        {/* <Footer2 /> */}
    <div className='ideas_dash'>
        <h1>Ideas</h1>
        <div>Account address: {account}</div>
        <ol>
            {
                Object.keys(ideas).map((_, index) => (
                    <div>
                        <h4>Idea: {ideas[index].name}</h4>
                        <span><b>What the DAO/people will gain from the project?</b> {ideas[index].gain}</span><br/>
                        <span><b>How much time the manager is willing to put in the project?</b> {ideas[index].pmTimeEstimate}</span><br/>
                        <span><b>What kind of knowledge would be necessary for internal support?</b> {ideas[index].internalSupportNeed}</span><br/>
                        <span><b>How much time from the internal support would be necessary?</b> {ideas[index].internalSupportHours}</span><br/>
                        <span><b>What kind of people would be necessary as a team, and how many hours?</b> {ideas[index].teamNeeded}</span><br/>
                        <span><b>How much time from the team would be necessary?</b> {ideas[index].teamHours}</span>
                    </div>
                ))
            }
        </ol>
    </div>
           

        {/* <button onClick={createIdea}>Create Test Idea </button> */}
        </div>
    );
    }





