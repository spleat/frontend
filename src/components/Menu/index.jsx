import {h, Component} from 'preact';

export default class Menu extends Component {
  menu = [
    'Hawajska',
    'Hawajska bacon',
    'Hawajska bacon bacon'
  ]

  render(){
    return (
      <div>
        <ul>
          {this.menu.map(menuItem => <li>{menuItem}</li>)}
        </ul>
      </div>
    );
  }
}
