import {h, Component} from 'preact';
import Fab from 'preact-material-components/Fab';
import Icon from 'preact-material-components/Icon';
import style from './style.scss';

export default class AddButton extends Component {
  render(){
    return (
      <div onClick={this.props.onClick}>
        <Fab mini={true}>
          <Icon>add_circle_outline</Icon>
        </Fab>
      </div>
    );
  }
}
