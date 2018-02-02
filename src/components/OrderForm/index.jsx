import {h, Component} from 'preact';
import Select from 'preact-material-components/Select';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import style from './style.scss';

export default class OrderForm extends Component {
  render(){
    return (
        <div className={style.form}>
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
          <Button className={style['form-button']} raised>
            Create order
          </Button>
        </div>
    );
  }
}
