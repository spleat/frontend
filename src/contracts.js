import { promisify } from './utils';
import { EtherPizzaContractInstance, etherPizzaAddress } from './etherPizzaContract';
import {spleatAbi } from './spleatContract';
window.Buffer = window.Buffer || require("buffer").Buffer;
const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/0ZevQ4HkUCzCVBOsYZcQ"));
}

const SpleatContractInstance = new web3.eth.Contract(spleatAbi, '0x5a00169fc88d30714eb16fda1a0acf53a92fb508');

const fetchMenu = async () => await promisify(cb => EtherPizzaContractInstance.wholeMenu(cb));
const openOrder = (deliveryAddress, phone) => SpleatContractInstance.methods.openOrder(etherPizzaAddress, deliveryAddress, phone).send({ from: "0x5E6f295c310cFad2FCc9f16345a162205bFD05bd" });
const addItem =  (orderId, dishId, price) => SpleatContractInstance.methods.addItem(orderId, dishId).send({ from: "0x5E6f295c310cFad2FCc9f16345a162205bFD05bd", value: price });

export {
  fetchMenu,
  openOrder,
  addItem
}
