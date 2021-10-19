import { connect } from "react-redux";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Counter from "../../Components/Counter/Couner";
import s from "./CartPage.module.css";

function CartPage({ products }) {
  return (
    <div className={s.wrapper}>
      <h2 className={s.pageTitle}>CART</h2>
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
                            {product.prices[0].currency}{" "}
                            {product.prices[0].amount * item.value}
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
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.items,
});

export default connect(mapStateToProps)(CartPage);
