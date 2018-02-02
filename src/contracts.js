import { promisify } from './utils';
import { EtherPizzaContractInstance, etherPizzaAddress } from './etherPizzaContract';
import { SpleatContractInstance } from './spleatContract';

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/0ZevQ4HkUCzCVBOsYZcQ"));
}

const fetchMenu = async () => await promisify(cb => EtherPizzaContractInstance.wholeMenu(cb));
const openOrder = async (deliveryAddress, phone) => await promisify(cb => SpleatContractInstance.openOrder(etherPizzaAddress, deliveryAddress, phone, cb));
const addItem = async (orderId, dishId, price) => await promisify(cb => SpleatContractInstance.addItem(orderId, dishId, { value: price }, cb));

export {
  fetchMenu,
  openOrder,
  addItem
}
