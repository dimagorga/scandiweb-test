import { connect } from "react-redux";
import { Query } from "react-apollo";
import Counter from "../../Components/Counter/Counter";
import s from "./CartPage.module.css";
import TotalCounter from "../../Components/TotalCounter/TotalCounter";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { productAttributesRequest } from "../../services/gql-requests";

function CartPage({ products, currencies }) {
  return (
    <div className={s.wrapper}>
      <h2 className={s.pageTitle}>CART</h2>
      {products.length ? (
        <ul className={s.list}>
          {products.map((item) => {
            return (
              <li key={item.id} id={item.id} className={s.item}>
                <Query query={productAttributesRequest(item.name)}>
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
                                  } `
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
                            <Carousel
                              showThumbs={false}
                              showIndicators={false}
                              width={"141px"}
                              centerMode={true}
                              centerSlidePercentage={100}
                              emulateTouch={true}
                              swipeable={true}
                              infiniteLoop={true}
                              showStatus={false}
                              useKeyboardArrows={true}
                            >
                              {product.gallery.map((image) => {
                                return (
                                  <img
                                    key={image}
                                    className={s.itemImage}
                                    src={image}
                                    alt={product.name}
                                  />
                                );
                              })}
                            </Carousel>
                          </div>
                        </div>
                      )
                    );
                  }}
                </Query>
              </li>
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

const mapStateToProps = (state) => ({
  products: state.products.items,
  currencies: state.products.currencies,
});

export default connect(mapStateToProps)(CartPage);
