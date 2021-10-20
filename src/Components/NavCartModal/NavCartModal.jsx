import { Component } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { v4 as uuidv4 } from "uuid";
import gql from "graphql-tag";
import s from "./NavCartModal.module.css";
import Counter from "../Counter/Counter";
import ModalButtons from "../ModalButtons/ModalButtons";

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
    return createPortal(
      <div className={s.Overlay} onClick={this.handleCloseModal}>
        <div
          className={s.Modal}
          style={{ overflowY: this.props.products.length > 3 && "scroll" }}
        >
          <p className={s.title}>
            My Bag,{" "}
            <span className={s.totalItems}>
              {this.props.products.length} items
            </span>
          </p>
          {this.props.products.map((item) => {
            return (
              <Query
                key={uuidv4()}
                query={gql`
                query {
                  product(id: "${item.name}") {            
                    name            
                    gallery
                    prices {
                      amount
                      currency
                    }
                  }
                }
              `}
              >
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
                                cur.currency === this.props.currencies &&
                                `${cur.currency} ${cur.amount * item.value}`
                            )}
                          </p>
                          <div className={s.attributes}>
                            {item.attributes.map((attr) => (
                              <p
                                key={attr}
                                style={{ backgroundColor: attr }}
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
          <p>Total: {this.state.total}</p>

          <ModalButtons onCloseModal={this.props.onCloseModal} />
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
