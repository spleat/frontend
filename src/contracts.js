import { promisify } from './utils';
import { etherPizzaAbi, etherPizzaAddress } from './etherPizzaContract';
import { spleatAbi } from './spleatContract';
window.Buffer = window.Buffer || require("buffer").Buffer;
const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/0ZevQ4HkUCzCVBOsYZcQ"));
}

const SpleatContractInstance = new web3.eth.Contract(spleatAbi, '0x5a00169fc88d30714eb16fda1a0acf53a92fb508');
const EtherPizzaContractInstance = new web3.eth.Contract(etherPizzaAbi, etherPizzaAddress);

const getCurrentAccount = async () => web3.eth.getAccounts().then((resp) => resp[0]);

const fetchMenu = () => EtherPizzaContractInstance.methods.wholeMenu().call();
const openOrder = (deliveryAddress, phone, currentAccount) => SpleatContractInstance.methods.openOrder(etherPizzaAddress, deliveryAddress, phone).send({ from: currentAccount });
const addItem =  (orderId, dishId, price, currentAccount) => SpleatContractInstance.methods.addItem(orderId, dishId).send({ from: currentAccount, value: price });
const orderById = (orderId) => SpleatContractInstance.methods.orderById(orderId).call();

export {
  fetchMenu,
  openOrder,
  addItem,
  orderById,
  getCurrentAccount
}
