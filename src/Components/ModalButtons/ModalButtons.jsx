import { Link } from "react-router-dom";
import s from "./ModalButtons.module.css";
export default function ModalButtons({ onCloseModal }) {
  return (
    <div className={s.buttons}>
      <Link to="/cart">
        <button className={s.buttonLink} onClick={onCloseModal}>
          VIEW BAG
        </button>
      </Link>
      <button className={s.button}>CHECK OUT</button>
    </div>
  );
}
