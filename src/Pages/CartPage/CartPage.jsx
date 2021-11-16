import { connect } from "react-redux";
import s from "./CartPage.module.css";
import TotalCounter from "../../Components/TotalCounter/TotalCounter";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { PureComponent } from "react";
import CartPageItem from "../../Components/CartPageItem/CartPageItem";

class CartPage extends PureComponent {
  render() {
    const { products, currencies } = this.props;
    return (
      <div className={s.wrapper}>
        <h2 className={s.pageTitle}>CART</h2>
        {products.length ? (
          <ul className={s.list}>
            {products.map((item) => {
              return (
                <CartPageItem
                  key={item.id}
                  item={item}
                  currencies={currencies}
                />
              );
            })}
            <TotalCounter />
          </ul>
        ) : (
          <p className={s.emptyMessage}>Your cart is empty.</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.items,
  currencies: state.products.currencies,
});

export default connect(mapStateToProps)(CartPage);
