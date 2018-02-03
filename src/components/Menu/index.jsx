import {h, Component} from 'preact';
import style from './style.scss';
import AddButton from './../AddButton';

export default class Menu extends Component {

  render(){
    const { readOnly, refresh } = this.props;

    return (
      <div>
        <ul className={style['menu-list']}>
          {this.props.menu.map(({ desc, readeablePrice, price, id }) => (
            <li className={style['menu-item']}>
              {!readOnly && <AddButton onClick={() => this.props.orderDish(id, price)}/>}
              <div className={style['menu-item-text']}>
                {desc} - {readeablePrice} ETH
              </div>
            </li>))
          }
        </ul>
      </div>
    );
  }
}
