export const APP_LIST_ADDRESS ='0x16B21177f9fD4cF194f52E2AC923c4Ae0de732Ac';
export const FARM_LIST_ADDRESS ='0x53e903AfBEE59DC75B246fe17e726eCF755Fa32C';
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
      "constant": true,
      "inputs": [],
      "name": "checkUser",
      "outputs": [
        {
          "name": "actor",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xc1562547"
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
          "type": "uint8"
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
      "constant": true,
      "inputs": [
        {
          "name": "_key",
          "type": "string"
        }
      ],
      "name": "userLogin",
      "outputs": [
        {
          "name": "res",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xb01f91bb"
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
          "name": "position",
          "type": "uint8"
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
      "signature": "0xc0de420c"
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
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_secret",
          "type": "string"
        }
      ],
      "name": "checkLogin",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x4f045d65"
    }
  ];
export const FARM_LIST_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "categoryId",
          "type": "uint32"
        }
      ],
      "name": "getCategoryId",
      "type": "event",
      "signature": "0xd617a251bbd9e4e0ce5ee242e7d444d67f71ef869662648a08c7743fd286fe49"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "milkId",
          "type": "uint32"
        }
      ],
      "name": "getMilkId",
      "type": "event",
      "signature": "0xa8211b837d154d8198fdbaadad7f241938293223f645567098775b2a7b05c5b7"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "cow",
          "type": "string"
        },
        {
          "name": "income",
          "type": "uint32"
        },
        {
          "name": "price",
          "type": "uint32"
        }
      ],
      "name": "addCategory",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x4a525453"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "farm",
          "type": "address"
        },
        {
          "name": "catId",
          "type": "uint32"
        }
      ],
      "name": "getCategory",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        },
        {
          "name": "",
          "type": "uint32"
        },
        {
          "name": "",
          "type": "uint32"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xdaad20de"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "categoryId",
          "type": "uint32"
        },
        {
          "name": "quantity",
          "type": "uint32"
        }
      ],
      "name": "addMilkInfo",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x27847ca0"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "farm",
          "type": "address"
        },
        {
          "name": "milkId",
          "type": "uint32"
        }
      ],
      "name": "getMilkInfo",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        },
        {
          "name": "",
          "type": "uint32"
        },
        {
          "name": "",
          "type": "uint32"
        },
        {
          "name": "",
          "type": "uint32"
        },
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xa343c3d8"
    }
  ];