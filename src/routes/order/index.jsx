import { h, Component } from 'preact';

import Card from 'preact-material-components/Card';
import Menu from './../../components/Menu';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Loader from './../../components/Loader';
import Button from 'preact-material-components/Button';

import { orderStatus, makeOrder, fetchMenu, addItem, orderById, getCurrentAccount } from './../../contracts';
import { HexToAscii } from './../../utils';
import style from './style.scss';

export default class Home extends Component {
  state = {
    menu: [],
    orderedDishes: [],
    myOrder: [],
    owner: false,
    closed: false
  }

  statusMapping = [
    'pending',
    'preparing',
    'delivering',
    'delivered',
    'rejected'
  ]

  makeOrder = () => {
    getCurrentAccount()
      .then((currentAccount) => {
        makeOrder(this.props.id, currentAccount)
          .on('transactionHash', () => {
            this.setState({loading: true, ordered: true});
          })
          .on('receipt', (receipt) => {
            this.setState({loading: false});
          })
      })
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

            this.setState({ owner: currentAccount == response[3], closed: response[2] })
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

  checkOrderStatus = () => {
    orderStatus(this.props.id)
      .then((restaurantOrderStatus) => {
        this.setState({ restaurantOrderStatus: this.statusMapping[restaurantOrderStatus] });
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
        this.checkOrderStatus();
        this.interval = setInterval(() => this.refreshOrder(), 500);
        this.interval2 = setInterval(() => this.checkOrderStatus(), 500);
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval2);
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
                <Menu menu={this.state.menu} orderDish={this.orderDish} exit={this.state.closed} />
              </Card>
              {this.state.owner && !this.state.closed && <Button className={style.button} onClick={this.makeOrder} raised>
                Make order
              </Button>}
            </LayoutGrid.Cell>
            <LayoutGrid.Cell cols="4">
              <Card>
                <Card.Title>My order</Card.Title>
                <Menu orderId={this.props.id} menu={this.state.myOrder} readOnly exit={false} />
                <Card.Title>Other orders</Card.Title>
                <Menu orderId={this.props.id} menu={this.state.orderedDishes} readOnly exit={false} />
              </Card>
            </LayoutGrid.Cell>
            <LayoutGrid.Cell cols="2" />
          </LayoutGrid.Inner>
          <LayoutGrid.Inner>
            <LayoutGrid.Cell cols="2" />
            <LayoutGrid.Cell cols="10">
              {this.state.closed && <div className={style.status}>Order status: {this.state.restaurantOrderStatus}</div>}
            </LayoutGrid.Cell>
          </LayoutGrid.Inner>

        </LayoutGrid>
      </div>
    );
  }
}
