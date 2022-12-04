export const CONTRACT_ADDRESS = '0x2aecCe5Eb7964E60192566D904116928Bb0D38E4';
export const CONTRACT_ABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_gain",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_pmTimeEstimate",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_internalSupportNeed",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_internalSupportHours",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_teamNeeded",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_teamHours",
                    "type": "string"
                }
            ],
            "name": "createIdea",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "count",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "ideas",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "gain",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "pmTimeEstimate",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "internalSupportNeed",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "internalSupportHours",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "teamNeeded",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "teamHours",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
