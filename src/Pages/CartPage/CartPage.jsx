import { connect } from "react-redux";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Counter from "../../Components/Counter/Counter";
import s from "./CartPage.module.css";

function CartPage({ products, currencies }) {
  return (
    <div className={s.wrapper}>
      <h2 className={s.pageTitle}>CART</h2>
      {products.length ? (
        <ul>
          {products.map((item) => {
            return (
              <li key={item.id} id={item.id} className={s.item}>
                <Query
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
                                  cur.currency === currencies &&
                                  `${cur.currency} ${cur.amount * item.value} `
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
                            <Counter pageSize id={item.id} value={item.value} />
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
              </li>
            );
          })}
          <p>Total: </p>
        </ul>
      ) : (
        <p className={s.emptyMessage}>Your cart is empty.</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.items,
  currencies: state.products.currencies,
});

export default connect(mapStateToProps)(CartPage);
