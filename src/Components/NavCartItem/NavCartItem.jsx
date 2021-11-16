import { PureComponent } from "react";
import Counter from "../Counter/Counter";
import s from "./NavCartItem.module.css";

export default class NavCartItem extends PureComponent {
  render() {
    const { product, currencies, item } = this.props;
    return (
      <div className={s.miniCard}>
        <div className={s.leftSide}>
          <p className={s.itemName}>{product.name}</p>
          <p className={s.itemPrice}>
            {product.prices.map(
              (cur) =>
                cur.currency === currencies &&
                `${cur.currency} ${
                  Math.round(cur.amount * item.value * 100) / 100
                }`
            )}
          </p>
          <div className={s.attributes}>
            {item.attributes.map((attr) => (
              <p
                key={attr}
                style={{
                  backgroundColor: attr,
                  fontSize: attr.length > 5 && 0,
                }}
                className={s.itemAttrs}
              >
                {attr}
              </p>
            ))}
          </div>
        </div>

        <div className={s.rightSide}>
          <Counter id={item.id} value={item.value} />
          <img
            className={s.itemImage}
            src={product.gallery[0]}
            alt={product.name}
          />
        </div>
      </div>
    );
  }
}
