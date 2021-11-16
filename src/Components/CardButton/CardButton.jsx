import { PureComponent } from "react";
import s from "./CardButton.module.css";
import addToCartIcon from "../../Images/addToCartIcon.png";

export default class CardButton extends PureComponent {
  render() {
    const { item, onBtnClick } = this.props;
    return (
      <button onClick={onBtnClick} className={s.btn} type="submit">
        <img id={item.id} src={addToCartIcon} alt="addToCartIcon" />
      </button>
    );
  }
}
