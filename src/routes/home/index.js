import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import OrderForm from './../../components/OrderForm';
import style from './style';

export default class Home extends Component {
  render() {
    return (
      <div class={style.home}>
        <LayoutGrid>
          <LayoutGrid.Inner>
            <LayoutGrid.Cell cols="3" />
            <LayoutGrid.Cell cols="6" className={style.container}>
              <h1>Create new order</h1>
              <Card>
                <OrderForm />
              </Card>
            </LayoutGrid.Cell>
            <LayoutGrid.Cell cols="3" />
          </LayoutGrid.Inner>
        </LayoutGrid>
      </div>
    );
  }
}
