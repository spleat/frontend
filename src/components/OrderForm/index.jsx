import {h, Component} from 'preact';
import Select from 'preact-material-components/Select';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import { route } from 'preact-router';

import style from './style.scss';
import Loader from './../Loader';

import { openOrder } from './../../contracts';

export default class OrderForm extends Component {
  state = {
    address: '',
    phone: '',
    loading: false
  }

  onClick = () => {
    const { phone, address } = this.state;

    openOrder(address, phone)
      .on('transactionHash', () => {
        this.setState({loading: true});
      })
      .on('receipt', (receipt) => {
        const orderId = receipt.events.OrderOpened.returnValues.orderId;

        this.setState({loading: false});
        route(`/orders/${orderId}`);
      })
      .on('error', console.error);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render(){
    return (
        <div className={style.form}>
          {this.state.loading && <Loader loading={this.state.loading} />}
          <Select
            className={style['form-select']}
            selectedIndex={0}
            disabled
          >
            <Select.Item>Ether Pizza</Select.Item>
          </Select>

          <TextField
            label="Address"
            value={this.state.address}
            onInput={this.handleChange('address')}
            className={style['form-input']}
          />

          <TextField
            label="Phone number"
            value={this.state.phone}
            onInput={this.handleChange('phone')}
            className={style['form-input']}
            type="tel"
          />

          <Button onClick={this.onClick} className={style['form-button']} raised>
            Create order
          </Button>
        </div>
    );
  }
}
