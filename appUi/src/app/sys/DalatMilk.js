export const APP_LIST_ADDRESS ='0x033E5D05cE3fB305a53462109f987F0a856C8177';
export const APP_LIST_ABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x8da5cb5b"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isOwner",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x8f32d59b"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "secret",
          "type": "string"
        }
      ],
      "name": "updateSecret",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xcd486ad5"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "secretDeploy",
      "outputs": [
        {
          "name": "res",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x85599d5b"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "getProfile",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x0f53a470"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "userAdd",
          "type": "address"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "secret",
          "type": "string"
        }
      ],
      "name": "updateProfile",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x9d5a3941"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_secret",
          "type": "string"
        }
      ],
      "name": "checkSecret",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x60ea95f1"
    }
  ];