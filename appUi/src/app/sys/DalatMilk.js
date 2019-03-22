export const APP_LIST_ADDRESS ='0x49f6BF5f691685934026eA5777AaBF671Cb1170B';
export const APP_LIST_ABI = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "new_address",
          "type": "address"
        }
      ],
      "name": "upgrade",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x0900f010"
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
      "name": "last_completed_migration",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x445df0ac"
    },
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
      "name": "checkApp",
      "outputs": [
        {
          "name": "res",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xb9d5ca38"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "completed",
          "type": "uint256"
        }
      ],
      "name": "setCompleted",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
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