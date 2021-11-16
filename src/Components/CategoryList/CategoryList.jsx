import { PureComponent } from "react";
import CardsItem from "../CardsItem/CardsItem";
import s from "./CategoryList.module.css";

class CategoryList extends PureComponent {
  render() {
    const category = this.props.category;

    return (
      <div>
        <h2 className={s.title}>{category.name}</h2>
        <ul className={s.list}>
          {category.products.map((item) => {
            return (
              <CardsItem
                key={item.id}
                item={item}
                onCartBtnClick={this.onCartBtnClick}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CategoryList;
