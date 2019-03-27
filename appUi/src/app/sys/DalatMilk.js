export const APP_LIST_ADDRESS ='0x49f6BF5f691685934026eA5777AaBF671Cb1170B';
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
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "info",
      "outputs": [
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
          "type": "bytes32"
        },
        {
          "name": "position",
          "type": "uint8"
        },
        {
          "name": "long",
          "type": "uint16"
        },
        {
          "name": "lat",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x0aae7a6b"
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
          "type": "uint16"
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
        },
        {
          "name": "position",
          "type": "uint16"
        }
      ],
      "name": "updateProfile",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
<<<<<<< HEAD
      "signature": "0x47d4d8d4"
=======
      "signature": "0xfdacd576"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_secret",
          "type": "string"
        }
      ],
      "name": "createSecret",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x1969f290"
>>>>>>> e628e61727cfbd2e968661ce9bd4cf8dd7589fd4
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