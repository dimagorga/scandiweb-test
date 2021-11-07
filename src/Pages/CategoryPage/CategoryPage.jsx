import { PureComponent } from "react";
import CardList from "../../Components/CardsList/CardsList";
import s from "./CategoryPage.module.css";
class CategoryPage extends PureComponent {
  render() {
    const { match } = this.props;
    return (
      <section className={s.wrapper}>
        <CardList pageCategory={match.url} />
      </section>
    );
  }
}
export default CategoryPage;
