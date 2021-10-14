import CardsItem from "../CardsItem/CardsItem";
import s from "./CardsList.module.css";

export default function CardList() {
  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        <CardsItem />
      </ul>
    </div>
  );
}
