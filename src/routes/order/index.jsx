import { h, Component } from 'preact';

import Card from 'preact-material-components/Card';
import Menu from './../../components/Menu';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Loader from './../../components/Loader';

import { fetchMenu, addItem, orderById, getCurrentAccount } from './../../contracts';
import { HexToAscii } from './../../utils';

export default class Home extends Component {
  state = {
    menu: [],
    orderedDishes: [],
    myOrder: []
  }

  orderDish = (dishId, price) => {
    getCurrentAccount()
      .then((currentAccount) => {
        addItem(this.props.id, dishId, price, currentAccount)
          .on('transactionHash', () => {
            this.setState({loading: true});
          })
          .on('receipt', (receipt) => {
            this.setState({loading: false});
          })
          .on('error', console.error);
      })
  }

  refreshOrder = () => {
    getCurrentAccount()
      .then((currentAccount) => {
        orderById(this.props.id)
          .then((response) => {
            const decodedDishes = response[0].map((id, index) => {
              const dish = this.state.menu.filter(m => m.id == id);
              const { desc, readeablePrice } = dish[0];
              let current = false;
              if (response[1][index] == currentAccount) {
                current = true;
              }

              return { desc, id, readeablePrice, current }
            })

            return decodedDishes;
          })
          .then((decodedDishes) => {
            this.setState({
              orderedDishes: decodedDishes.filter(d => d.current == false),
              myOrder: decodedDishes.filter(d => d.current == true),
            })
          })
          .catch(err => console.log(err));
      })
  }


  componentDidMount() {
    fetchMenu()
      .then((response) => (
        response[0].map((id, index) => {
          const desc = HexToAscii(response[1][index]);
          const price = response[2][index];
          const readeablePrice = (price / 1e18).toString();

          return { desc, readeablePrice, price, id }
        })
      ))
      .then((menu) => {
        this.setState({menu});
      }).then(() => {
        this.refreshOrder();
        this.interval = setInterval(() => this.refreshOrder(), 2000);
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <LayoutGrid>
          <LayoutGrid.Inner>
            <LayoutGrid.Cell cols="2" />
            <LayoutGrid.Cell cols="4">
              <Card>
                <Card.Title>EtherPizza Menu</Card.Title>
                <Menu menu={this.state.menu} orderDish={this.orderDish} />
              </Card>
            </LayoutGrid.Cell>
            <LayoutGrid.Cell cols="4">
              <Card>
                <Card.Title>My order</Card.Title>
                <Menu orderId={this.props.id} menu={this.state.myOrder} readOnly />
                <Card.Title>Ordered dishes</Card.Title>
                <Menu orderId={this.props.id} menu={this.state.orderedDishes} readOnly />
              </Card>
            </LayoutGrid.Cell>
            <LayoutGrid.Cell cols="2" />
          </LayoutGrid.Inner>
        </LayoutGrid>
      </div>
    );
  }
}
