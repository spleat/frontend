const abiArray = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "orderId",
        "type": "uint256"
      }
    ],
    "name": "makeOrder",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "restaurant",
        "type": "address"
      },
      {
        "name": "deliveryAddress",
        "type": "string"
      },
      {
        "name": "phone",
        "type": "string"
      }
    ],
    "name": "openOrder",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "orderId",
        "type": "uint256"
      }
    ],
    "name": "restaurantOrderStatus",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "orderId",
        "type": "uint256"
      },
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "addItem",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "orders",
    "outputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "restaurant",
        "type": "address"
      },
      {
        "name": "deliveryAddress",
        "type": "string"
      },
      {
        "name": "phone",
        "type": "string"
      },
      {
        "name": "payed",
        "type": "uint256"
      },
      {
        "name": "ordered",
        "type": "bool"
      },
      {
        "name": "restaurantOrderId",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "orderId",
        "type": "uint256"
      }
    ],
    "name": "orderItems",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "orderId",
        "type": "uint256"
      }
    ],
    "name": "orderBuyers",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "orderId",
        "type": "uint256"
      }
    ],
    "name": "OrderOpened",
    "type": "event"
  }
]

const Contract = web3.eth.contract(abiArray);
const SpleatContractInstance = Contract.at('0x5c76f365acf895b84108142da0da2c7b7ee37619');

export {
  SpleatContractInstance
}