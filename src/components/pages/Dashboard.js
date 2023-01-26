import { ethers } from "ethers";
import { useState, useEffect } from 'react';

function Dashboard() {
    const [address, setAddress] = useState('0x...')
    const [provider, setProvider] = useState();
    const [signer, setSigner] = useState('');
    const [contract, setContract] = useState('');
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');

    const connect = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum); 
        const accounts = await provider.send("eth_requestAccounts", []); 
        const account = handleAccountsChanged(accounts);
        const signer = provider.getSigner();

        setProvider(provider);
        setAddress(account);
        setSigner(signer);
        getContract();
        console.log(account);
    }

    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0 ) {
            console.log("Please connect to metamask")

        } else {
            window.ethereum.on("accountsChanged", () => { window.location.reload() });
            return accounts[0];
        }
    }

    const getContract = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum  || 'http://localhost:8545');
        const contractAddress = "0x7377ABAb913F1320397ed33FD328642e668b30bb" 
        const contractABI = [
            "function mint()",
            "function updateMemberSkills(uint tokenId, uint _skill_1, uint _skill_2) public",
            "function getTokenURI(uint256 tokenId) public view returns (string memory)",
            "function memberSkillsStructMap(address memberAddress) public view returns(tuple(uint256 memberId, uint256 skill_1, uint256 skill_2, uint256 skill_3, uint256 skill_4, uint256 skill_5, uint256 skill_6, uint256 skill_7, uint256 skill_8, uint256 skill_8, uint256 skill_9, uint256 skill_10, unit256 projectsCompleted))",
            "function name() public view returns (string memory)",
            "function ownerOf(uint256 tokenId) public view returns (string memory)",
            "function symbol() public view returns(string memory)",
            "function tokenURI(uint256 tokenId) public view returns (string memory)"
        ];

        let contract = new ethers.Contract(
            contractAddress,
            contractABI,
            provider
          )

        setContract(contract);
    }

    useEffect(() => {
        ( async () => {

            connect()

            if(provider && signer && contract) {
                console.log('Provider, Signer and Contract loaded')
                console.log('secondary branch')
            }
            
        })()
       
    }, [])

    const getName = async () => {
        console.log(contract)
        const name = await contract.name();
        console.log(name)
        setName(name);
    };

    return (
        <div>
            <div>ArchiDAO NFT Dashboard</div>
            <div>Connected Address: {address}</div>
            <button onClick={connect}>Connect Wallet</button>
            <div>NFT Name: {name}</div>
            <div>NFT Symbol: {symbol}</div>

        </div>
    )
}

export default Dashboard;