import {h, Component} from 'preact';
import style from './style.scss';

export default class Loader extends Component {
  render() {
    return (
      <div className={style["page-loading"]}>
        <div className={style["three-balls"]}>
          <div className={`${style['ball']} ${style['ball1']}`}></div>
          <div className={`${style['ball']} ${style['ball2']}`}></div>
          <div className={`${style['ball']} ${style['ball3']}`}></div>
        </div>
      </div>
    )
  }
}
