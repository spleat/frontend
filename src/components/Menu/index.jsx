import {h, Component} from 'preact';
import style from './style.scss';
import AddButton from './../AddButton';

export default class Menu extends Component {
  menu = [
    { title: 'Hawajska', price: '10 PLN', id: 1 },
    { title: 'Hawajska Bacon', price: '16 PLN', id: 15 },
    { title: 'Hawajska Bacon^2', price: '26 PLN', id: 4 }
  ]

  onClick = (id) => {
    console.log(id);
  }

  render(){
    return (
      <div>
        <ul className={style['menu-list']}>
          {this.menu.map(({ title, price, id }) => (
            <li className={style['menu-item']}>
              <AddButton onClick={() => this.onClick(id)}/>
              <div className={style['menu-item-text']}>
                {title}
              </div>
            </li>))
          }
        </ul>
      </div>
    );
  }
}
