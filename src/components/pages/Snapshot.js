// import React, { Suspense, useEffect, useState } from 'react';
// import Footer2 from '../Footer2';
// import Web3 from 'web3';
// import { CONTRACT_ADDRESS, CONTRACT_ABI  } from '../../config';
// import './dashboard.css';
// import snapshot from '@snapshot-labs/snapshot.js';
// import { Web3Provider } from '@ethersproject/providers';


// export default function Snapshot() {
//     // const [account, setAccount] = useState();
//     //   const [ideaContract, setIdeaContract] = useState();
    
// const hub = 'https://hub.snapshot.org'; // or https://testnet.snapshot.org for testnet
// const client = new snapshot.Client712(hub);




// const web3 = new Web3Provider(window.ethereum);
// const [account] = await web3.listAccounts();


// ////////////cast a vote////////////////////////////

// const receiptvote = await client.vote(web3, account, {
//   space: 'yam.eth',
//   proposal: '0x21ea31e896ec5b5a49a3653e51e787ee834aaf953263144ab936ed756f36609f',
//   type: 'single-choice',
//   choice: 1,
//   reason: 'Choice 1 make lot of sense',
//   app: 'my-app'
// });

// ////////////////create a proposal////////////////////////

// const receiptproposal = await client.proposal(web3, account, {
//   space: 'yam.eth',
//   type: 'single-choice',
//   title: 'Test proposal using Snapshot.js',
//   body: 'This is the content of the proposal',
//   choices: ['Alice', 'Bob', 'Carol'],
//   start: 1636984800,
//   end: 1637244000,
//   snapshot: 13620822,
//   network: '1',
//   plugins: JSON.stringify({}),
//   app: 'my-app'
// });



//     // useEffect(() => {
//     //   async function load(){
//     //     const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
//     //     const accounts = await web3.eth.requestAccounts();
//     //     setAccount(accounts[0]);
//     //            const counter = await ideaContract.methods.count().call();
//     //          }
//     //   load();
//     // }, []);

  

   
//     return (
        
//         <div className="dash_container">
            
//       </div>
//     );
//     }





