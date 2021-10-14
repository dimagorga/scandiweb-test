import CardList from "../../Components/CardsList/CardsList";
import s from "./CategoryPage.module.css";
export default function CategoryPage() {
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Category name</h2>
      <CardList />
    </div>
  );
}
