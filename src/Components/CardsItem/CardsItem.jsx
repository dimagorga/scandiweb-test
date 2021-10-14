import s from "./CardsItem.module.css";
import product from "../../Images/product.jpg";
import addToCartIcon from "../../Images/addToCartIcon.png";

export default function CardsItem() {
  return (
    <li className={s.item}>
      <img className={s.image} src={product} alt="name" />
      <button className={s.btn} type="button">
        <img src={addToCartIcon} alt="addToCartIcon" />
      </button>
      <p className={s.itemName}>Apollo Running Short</p>
      <p className={s.price}>$50.00</p>
    </li>
  );
}
