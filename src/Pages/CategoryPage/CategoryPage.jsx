import { PureComponent } from "react";
import CardList from "../../Components/CardsList/CardsList";
import s from "./CategoryPage.module.css";
class CategoryPage extends PureComponent {
  render() {
    return (
      <section className={s.wrapper}>
        <CardList pageCategory={this.props.match.url} />
      </section>
    );
  }
}
export default CategoryPage;
