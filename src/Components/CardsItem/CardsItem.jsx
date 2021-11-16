import { Link, withRouter } from "react-router-dom";
import s from "./CardsItem.module.css";
import { PureComponent } from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { changeCurrency } from "../../redux/product/currencies-action";
import { addProduct } from "../../redux/product/product-actions";
import CardButton from "../CardButton/CardButton";

class CardsItem extends PureComponent {
  onBtnClick = (e) => {
    console.log(e.target);
  };

  onBtnRedirect = (item) => {
    this.props.history.push(`/products/${item.id}`);
  };

  onCartBtnClick = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      id: uuidv4(),
      name: e.target.id,
      attributes: [],
      value: 1,
    });
  };

  render() {
    const { item, currencies, location } = this.props;

    return (
      <li className={s.item}>
        <Link
          className={s.link}
          to={{
            pathname: `/products/${item.id}`,
            state: { from: location },
          }}
        >
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
          <CardButton
            item={item}
            onBtnClick={
              item.attributes.length === 0
                ? this.onCartBtnClick
                : () => this.onBtnRedirect(item)
            }
          />
        )}
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.products.currencies,
});
const mapDispathcToProps = (dispatch) => ({
  onChangeCurrency: (currency) => dispatch(changeCurrency(currency)),
  onSubmit: (product) => dispatch(addProduct(product)),
});

export default connect(
  mapStateToProps,
  mapDispathcToProps
)(withRouter(CardsItem));
