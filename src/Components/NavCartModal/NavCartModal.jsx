import { Component } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { v4 as uuidv4 } from "uuid";
import s from "./NavCartModal.module.css";
import Counter from "../Counter/Counter";
import ModalButtons from "../ModalButtons/ModalButtons";
import TotalCounter from "../TotalCounter/TotalCounter";
import { productAttributesRequest } from "../../services/gql-requests";

const modalRoot = document.querySelector("#modal-root");

class NavCartModal extends Component {
  state = {
    total: 0,
  };
  componentDidMount() {
    window.addEventListener("keydown", this.handleCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleCloseModal);
  }

  handleCloseModal = (e) => {
    if (e.key === "Escape" || e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { products, currencies, onCloseModal } = this.props;

    return createPortal(
      <div className={s.Overlay} onClick={this.handleCloseModal}>
        <div
          className={s.Modal}
          style={{ overflowY: products.length > 3 && "scroll" }}
        >
          <p className={s.title}>
            My Bag,{" "}
            <span className={s.totalItems}>{products.length} items</span>
          </p>
          {products.map((item) => {
            return (
              <Query key={uuidv4()} query={productAttributesRequest(item.name)}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error : </p>;
                  const { product } = data;
                  return (
                    product && (
                      <div className={s.miniCard}>
                        <div className={s.leftSide}>
                          <p className={s.itemName}>{product.name}</p>
                          <p className={s.itemPrice}>
                            {product.prices.map(
                              (cur) =>
                                cur.currency === currencies &&
                                `${cur.currency} ${
                                  Math.round(cur.amount * item.value * 100) /
                                  100
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
                    )
                  );
                }}
              </Query>
            );
          })}
          <div className={s.modalOptions}>
            <TotalCounter />
            <ModalButtons onCloseModal={onCloseModal} />
          </div>
        </div>
      </div>,
      modalRoot
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.items,
  currencies: state.products.currencies,
});

export default connect(mapStateToProps)(NavCartModal);
