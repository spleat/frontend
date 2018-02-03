import { h, Component } from 'preact';

import Card from 'preact-material-components/Card';
import Menu from './../../components/Menu';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Loader from './../../components/Loader';

import { fetchMenu, addItem } from './../../contracts';
import { HexToAscii } from './../../utils';

export default class Home extends Component {
  state = {
    menu: [],
    orderedDishes: []
  }

  orderDish = (dishId, price) => {
    addItem(this.props.id, dishId, price)
      .on('transactionHash', () => {
        this.setState({loading: true});
      })
      .on('receipt', (receipt) => {
        this.setState({loading: false});
      })
      .on('error', console.error);
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
      })
      .catch(err => {
        console.log(err);
      })
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
                <Card.Title>Ordered dishes</Card.Title>
                <Menu menu={this.state.orderedDishes} readOnly />
              </Card>
            </LayoutGrid.Cell>
            <LayoutGrid.Cell cols="2" />
          </LayoutGrid.Inner>
        </LayoutGrid>
      </div>
    );
  }
}
