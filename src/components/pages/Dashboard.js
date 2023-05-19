import { Alchemy, Network, Wallet, Utils } from 'alchemy-sdk';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import './Dashboard.css';

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
    // "function updateMemberSkills(uint tokenId, uint _skill_1, uint _skill_2) public",
    "function getTokenURI(uint256 tokenId) public view returns (string memory)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
    // "function memberSkillsStructMap(address memberAddress) public view returns(tuple(uint256 memberId, uint256 skill_1, uint256 skill_2, uint256 skill_3, uint256 skill_4, uint256 skill_5, uint256 skill_6, uint256 skill_7, uint256 skill_8, uint256 skill_8, uint256 skill_9, uint256 skill_10, unit256 projectsCompleted))",
    "function name() view returns (string memory)",
    "function ownerOf(uint256 tokenId) public view returns (string memory)",
    "function symbol() public view returns(string memory)",
    "function addressToNFTNumber(address ownerAddress) public view returns(tuple(uint256 nftNumber))"
];


//CONTRACT INSTANCE
const archiDaoContractInstance = new ethers.Contract(contractAddress, contractABI, infuraProvider);
// console.log(archiDaoContractInstance)

function Dashboard() {
  const [blockNumber, setBlockNumber] = useState();
  const [contractName, setContractName] = useState();
  const [symbol, setSymbol] = useState('');
  const [walletAddress, setWalletAddress] = useState()
  const [walletSigner, setWalletSigner] = useState('');
  const [isNFTOwner, setIsNFTOwner] = useState('');
  const [tokenMetadata, setTokenMetadata] = useState([]);

  const [hideDiv, setHideDiv] = useState(false)

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
    console.log(getNumber);

    if(getNumber > 0) {
      setHideDiv(true);
      getMetadata(getNumber)
    } else {
      const res = document.getElementsByClassName('no-results')[0].innerHTML = '<h1>You are not a ArchiDAO member</h1>'
      // console.log(res)
    }
  }

  async function getMetadata (getNumber) {
    const metadata = await archiDaoContractInstance.tokenURI(getNumber);
    const metadataSlice = metadata.slice(29);

    const base64ToStr = atob(metadataSlice);
    // const buffer = Buffer.from(metadataSlice, 'base64')
    // console.log(buffer)

    const jsonParse = await JSON.parse(base64ToStr)

    console.log(jsonParse)

    setTokenMetadata(jsonParse);
  }

  const mintNFT = async () => {
    const archiDaoContractInstanceSigner = new ethers.Contract(contractAddress, contractABI, walletSigner);

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

    return (
        <div>

          {/* <div className="about__content"  ><p style={{position:'fixed', right:'8vw', top:'180px',   color:'black', textAlign:'right', height:'30px', fontFamily:'EG' }}>Wallet Address: {walletAddress} </p></div> */}
          <h1 className="about__title" style={{color:'black', textAlign:'left', paddingLeft:'100px', paddingTop:'90px'}}>DASHBOARD</h1>
          <div className="about__content" >
          {/* <p style={{color:'black', textAlign:'left', paddingLeft:'100px', paddingTop:'10px'}}>ArchiDAO Members Count: </p> */}
          </div>
          <br />
          {/* <div style={{color:'black', textAlign:'left', paddingLeft:'100px', paddingTop:'90px', fontFamily:'Krona One', fontWeight:'bold', fontSize:'20px', letterSpacing:'8px' }}> {contractName}</div> */}

        {/* <h1> You are a Member of ArchiDAO</h1> */}
        {/* <h2><b>Dashboard</b></h2> */}
        <div>Member ID: {tokenMetadata.memberId} </div>
        <div>Description: {tokenMetadata.description}</div>
        <div>Image URL: <a style={{'color': 'blue'}} target='_blank' href={tokenMetadata.image} >ArchiDAO NFT Image </a></div>
        {/* <img id='img' src={tokenMetadata.image} alt='image file'/> */}
        <div><a style={{'color': 'blue'}} href='https://snapshot.org/#/archidao.eth' target='_blank'>SnapShot Voting</a></div>
         
      </div>
    )
  }

  return (
    <div className="App">
      <h1>Mumbai (MATIC) Testnet ({archiDaoContractInstance.provider._network.name})</h1>
        {/* <div>Block Number: {blockNumber}</div> */}
        <button onClick={mintNFT} style={{position:'fixed', top:'150px', backgroundColor:'orange',  color:'black', textAlign:'right', height:'30px', fontFamily:'EG', fontSize:'20px' }}>Mint NFT</button>
        <div><br /></div>
        <div>Contract Name: {contractName}</div>
        <div>Contract Symbol: {symbol}</div>
        <div><br /></div>

        {/* <button onClick={connectMetamask} style={{position:'fixed', right:'8vw', top:'50px', backgroundColor:'white',  color:'black', textAlign:'right', height:'30px', fontFamily:'EG', fontSize:'20px' }}>Connect Wallet</button> */}
        {walletAddress === null ? 
              (
                <button onClick={connectMetamask} style={{position:'fixed', right:'8vw', top:'70px', backgroundColor:'white',  color:'black', textAlign:'right', height:'30px', fontFamily:'EG', fontSize:'20px' }} >Connect Wallet</button>
              )
              :
              (
                <button onClick={disconnectMetamask} style={{position:'fixed', right:'8vw', top:'70px', backgroundColor:'white',  color:'black', textAlign:'right', height:'30px', fontFamily:'EG', fontSize:'20px' }} >Disconnect Wallet</button>
              )
              }

        {/* <div>Wallet Address: {walletAddress} </div> */}
        <p style={{position:'fixed', left:'8vw', top:'150px',   color:'black', textAlign:'right', height:'30px', fontFamily:'EG' }}>Wallet Address: {walletAddress} </p>
        <br />
        <div className='results'>
          <div className='no-results'></div>
          { hideDiv ? <Results /> : null}
        </div>
        
    </div>
    );
}

export default Dashboard;