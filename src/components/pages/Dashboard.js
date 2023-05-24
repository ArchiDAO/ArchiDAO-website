// import { Alchemy, Network, Wallet, Utils } from 'alchemy-sdk';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import './Dashboard.css';

//FETCH Snapshot Spaces ADAOgoerli data.
// console.log('https://testnet.snapshot.org/graphql?query=query%20%7B%0A%20%20space(id%3A%20%22adaogoerli.eth%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20about%0A%20%20%20%20network%0A%20%20%20%20symbol%0A%20%20%20%20members%0A%20%20%7D%0A%7D')


// ALCHEMY threshold reached for May '23
// const settings = {
//   // apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
//   // network: Network.ETH_GOERLI,
//   apiKey: process.env.MUMBAI_ALCHEMY_API_KEY,
//   network: Network.MATIC_MUMBAI,
// };
// const alchemy = new Alchemy(settings);

// NETWORKS
// const network = "goerli";
// const contractAddress = "0x7EaEd8E4b176c683CA1173506Df334Fa5eDFea6b"; //goerli
const network = "maticmum";

// Provider
// const alchemyProvider = new ethers.providers.AlchemyProvider(network, process.env.REACT_APP_ALCHEMY_API_KEY); //goerli
// const alchemyProvider = new ethers.providers.AlchemyProvider(network, process.env.MUMBAI_ALCHEMY_API_KEY); //mumbai
const infuraProvider = new ethers.providers.InfuraProvider( network, [process.env.MUMBAI_INFURA_API_KEY])

const contractAddress = "0xa69444d07c1FF34eEDB19bfDcc077A8B94f5781e"; //Mumbai

const contractABI = [
    "function mint()",
    // "function getTokenURI(uint256 tokenId) public view returns (string memory)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
    "function name() view returns (string memory)",
    "function ownerOf(uint256 tokenId) public view returns (string memory)",
    "function symbol() public view returns(string memory)",
    "function addressToNFTNumber(address ownerAddress) public view returns(tuple(uint256 nftNumber))"
];


//CONTRACT INSTANCE
const archiDaoContractInstance = new ethers.Contract(contractAddress, contractABI, infuraProvider);
// console.log(archiDaoContractInstance)

function Dashboard() {
  const [contractName, setContractName] = useState();
  const [symbol, setSymbol] = useState('');
  const [walletAddress, setWalletAddress] = useState(null)
  const [walletSigner, setWalletSigner] = useState(null);
  // const [isNFTOwner, setIsNFTOwner] = useState('');
  const [tokenMetadata, setTokenMetadata] = useState([]);

  const [hideDiv, setHideDiv] = useState(false)

  useEffect(() => {
    const getSpaces = async() => {
      const data = await fetch('https://testnet.snapshot.org/graphql?query=query%20%7B%0A%20%20space(id%3A%20%22adaogoerli.eth%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20about%0A%20%20%20%20network%0A%20%20%20%20symbol%0A%20%20%20%20members%0A%20%20%7D%0A%7D')
      const json = await data.json();
      console.log(json.data.space)
    }
    getSpaces()
  }, [])

  useEffect(() => {

    async function getContractName() {
        setContractName(await archiDaoContractInstance.name())
        // console.log(contractName)
    }
    getContractName()

    async function getContractSymbol() {
        setSymbol(await archiDaoContractInstance.symbol())
    }
    getContractSymbol()

  }, []);

  const connectMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum); 
    const accounts = await provider.send("eth_requestAccounts", []); 
    const account = handleAccountsChanged(accounts);
    const signer = provider.getSigner();

    setWalletAddress(account);
    setWalletSigner(signer);

    checkIfNftOwner(account);

  }

  const disconnectMetamask = async () => {
    setWalletAddress(null);
    setWalletSigner(null);
    setHideDiv(false);

    document.getElementsByClassName('no-results')[0].innerHTML = ''
  }

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0 ) {
        console.log("Please connect to metamask")

    } else {
        window.ethereum.on("accountsChanged", () => { window.location.reload() });
        return accounts[0];
    }
  }

  async function checkIfNftOwner (walletAddress) {
    const createBnInstance = await archiDaoContractInstance.addressToNFTNumber(walletAddress)
    const getNumber = ethers.BigNumber.from(createBnInstance.nftNumber).toNumber()
    console.log('MemberID:', getNumber);

    if(getNumber > 0) {
      setHideDiv(true);
      getMetadata(getNumber)
    } else {
      document.getElementsByClassName('no-results')[0].innerHTML = '<h1>You are not a ArchiDAO member</h1>'
    }
  }

  async function getMetadata (getNumber) {
    const metadata = await archiDaoContractInstance.tokenURI(getNumber);
    const metadataSlice = metadata.slice(29);

    const base64ToStr = atob(metadataSlice);
    // const buffer = Buffer.from(metadataSlice, 'base64')
    // console.log(buffer)

    const jsonParse = await JSON.parse(base64ToStr)

    // console.log(jsonParse)

    setTokenMetadata(jsonParse);
  }

  const mintNFT = async () => {
    const archiDaoContractInstanceSigner = new ethers.Contract(contractAddress, contractABI, walletSigner);
    if(walletSigner === null) {
      alert('Connect Metamask');
    }
    const mintNFT = await archiDaoContractInstanceSigner.mint(); 
    console.log(mintNFT);
  }

  // useEffect(() => {
  //   const logInWithNFT = async () => {
  //     if(walletAddress) {
  //         const isNFTOwner = await alchemy.nft.verifyNftOwnership(walletAddress, contractAddress);
  //         setIsNFTOwner(isNFTOwner);
  //         const addressNFTNumber = await archiDaoContractInstance.addressToNFTNumber(walletAddress);
  //         let ownerNFTNumber = await addressNFTNumber.toString();

  //         if(isNFTOwner) {
  //           console.log(isNFTOwner);
  //           setHideDiv(true);
  //           const getTokenURI = await archiDaoContractInstance.getTokenURI(ownerNFTNumber);

  //           const tokenURISlice = getTokenURI.slice(29)

  //           const base64ToStr = atob(tokenURISlice);
  //           console.log(base64ToStr);

  //           {/* image <div>{tokenMetadata.slice(96, 171)}</div> */}

  //           setTokenMetadata(base64ToStr)


  //         } else if(!isNFTOwner) {
  //           console.log('You are not yet a member of ArchiDAO')
  //         }
  //     }
  //   }
  //   logInWithNFT()

  // }, [walletAddress])

  const Results = () => {

    // let img;
    // if(tokenMetadata.image) {
    //   img = tokenMetadata.image;
    //   // img = img.slice(0,67)
    //   console.log(img)
    // }


    return (
        <div>
        {/* 'https://ipfs.io/ipfs/QmcGZuEdFZNY7pxnKCfCVckXhABw4eLYZcYBNvExYZv5TP?filename=2.png' */}
        {/* 'https://ipfs.io/ipfs/QmcGZuEdFZNY7pxnKCfCVckXhABw4eLYZcYBNvExYZv5TP'  */}
        <img style={{paddingLeft:'100px', marginBottom: '20px'}} id='img' src={'https://ipfs.io/ipfs/QmcGZuEdFZNY7pxnKCfCVckXhABw4eLYZcYBNvExYZv5TP'} alt='image file'/>
        <div style={{color:'black', textAlign:'center', paddingLeft:'100px', fontFamily:'Krona One', fontWeight:'bold', fontSize:'20px', letterSpacing:'8px' }}>Member ID: {tokenMetadata.memberId} </div>
        <div style={{color:'black', textAlign:'center', paddingLeft:'100px', fontFamily:'Krona One', paddingTop:'20px', fontWeight:'bold', fontSize:'20px', letterSpacing:'8px' }}>Description: {tokenMetadata.description}</div>
        {/* <div style={{color:'black', textAlign:'center', paddingLeft:'100px', fontFamily:'Krona One', paddingTop:'20px', fontWeight:'bold', fontSize:'20px', letterSpacing:'8px' }}>Image URL: <a style={{'color': 'blue'}} target='_blank' href={tokenMetadata.image} >ArchiDAO NFT Image </a></div> */}
        <div style={{textAlign:'center', paddingLeft:'100px', fontFamily:'Krona One', fontWeight:'bold', paddingTop:'20px', fontSize:'20px', letterSpacing:'8px' }}><a style={{color:'orange'}} href='ipfs://bafybeiby7if73utdzlbwo2cm2rygtcse5j3wsr2pogylwt4jw46pzzeq3e/#/adaogoerli.eth' target='_blank'>SnapShot Voting</a></div>
    
      </div>
    )
  }

  return (
    <div className="App">
      
      <h1>Mumbai (MATIC) Testnet ({archiDaoContractInstance.provider._network.name})</h1>
        <button onClick={mintNFT} style={{position:'fixed', top:'150px', backgroundColor:'orange',  color:'black', textAlign:'right', height:'30px', fontFamily:'EG', fontSize:'20px' }}>Mint NFT</button>
        <h1 className="about__title" style={{color:'black', textAlign:'left', paddingLeft:'100px', paddingTop:'90px'}}>DASHBOARD</h1>

        <div style={{color:'black', textAlign:'center', paddingLeft:'100px', paddingTop:'40px', fontFamily:'Krona One', fontWeight:'bold', fontSize:'20px', letterSpacing:'8px' }}> {contractName}</div>
        {/* <div>Contract Symbol: {symbol}</div> */}

        {walletAddress === null ? 
              (
                <button onClick={connectMetamask} style={{position:'fixed', right:'8vw', top:'70px', backgroundColor:'white',  color:'black', textAlign:'right', height:'30px', fontFamily:'EG', fontSize:'20px' }} >Connect Wallet</button>
              )
              :
              (
                <button onClick={disconnectMetamask} style={{position:'fixed', right:'8vw', top:'70px', backgroundColor:'white',  color:'black', textAlign:'right', height:'30px', fontFamily:'EG', fontSize:'20px' }} >Disconnect Wallet</button>
              )
              }

        <p style={{position:'fixed', left:'1vw', top:'60px',   color:'black', textAlign:'right', height:'30px', fontFamily:'EG' }}>Wallet Address: {walletAddress} </p>
        <br />
        <div className='results'>
          <div className='no-results'></div>
          { hideDiv ? <Results /> : null}
        </div>
        
    </div>
    );
}

export default Dashboard;