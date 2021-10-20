import { Link } from "react-router-dom";
import s from "./CardsItem.module.css";

import addToCartIcon from "../../Images/addToCartIcon.png";
import { connect } from "react-redux";
import { changeCurrency } from "../../redux/product/currencies-action";

function CardsItem({ item, onCartBtnClick, currencies }) {
  return (
    <li className={s.item}>
      <Link className={s.link} to={`/products/${item.id}`}>
        <img className={s.image} src={item.gallery[0]} alt="name" />
        {!item.inStock && <p className={s.imageBlur}>OUT OF STOCK</p>}

        <p className={s.itemName}>{item.name}</p>
        <p className={s.price}>
          {item.prices.map(
            (cur) =>
              cur.currency === currencies && `${cur.currency} ${cur.amount}`
          )}
        </p>
      </Link>
      {item.inStock && (
        <button onClick={onCartBtnClick} className={s.btn} type="submit">
          <img id={item.id} src={addToCartIcon} alt="addToCartIcon" />
        </button>
      )}
    </li>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.products.currencies,
});
const mapDispathcToProps = (dispatch) => ({
  onChangeCurrency: (currency) => dispatch(changeCurrency(currency)),
});

export default connect(mapStateToProps, mapDispathcToProps)(CardsItem);
