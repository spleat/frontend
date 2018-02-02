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

export default class OrderForm extends Component {
  render(){
    return (
      <div>
        <Select hintText="Select restaurant"
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
          <div>
            <TextField label="Address"/>
          </div>
          <div>
            <TextField type="tel" label="Phone number"/>
          </div>
          <div>
            <Button raised>Create order</Button>
          </div>
      </div>
    );
  }
}
