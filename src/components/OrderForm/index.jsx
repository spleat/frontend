import {h, Component} from 'preact';
import Select from 'preact-material-components/Select';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';

import 'preact-material-components/TextField/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Select/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import style from './style.scss';

export default class OrderForm extends Component {
  render(){
    return (
      <div class={style.form}>
        <Select
          className={style['form-input']}
          hintText="Select restaurant"
          selectedIndex={this.state.chosenIndex}
          onChange={(e)=>{
            this.setState({
              chosenIndex: e.selectedIndex
            });

            console.log(e.selectedOptions);
          }}>
            <Select.Item>Ether Pizza</Select.Item>
            <Select.Item>Ether Burger - coming soon</Select.Item>
          </Select>
          <TextField className={style['form-input']} label="Address"/>
          <TextField className={style['form-input']} type="tel" label="Phone number"/>
          <div>
            <Button raised>Create order</Button>
          </div>
      </div>
    );
  }
}
