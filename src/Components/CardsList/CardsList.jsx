import s from "./CardsList.module.css";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

// import product from "../../Images/product.jpg";
import addToCartIcon from "../../Images/addToCartIcon.png";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { addProduct } from "../../redux/product/product-actions";

function CardsList({ onSubmit }) {
  const onCartBtnClick = (e) => {
    e.preventDefault();
    onSubmit({
      name: e.target.id,
      attributes: [],
      value: 1,
    });
  };
  return (
    <Query
      query={gql`
        query {
          categories {
            name
            products {
              id
              name
              inStock
              gallery
              prices {
                currency
                amount
              }
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error : </p>;

        return data.categories.map((category) => {
          return (
            <div key={category.name} className={s.wrapper}>
              <h2 className={s.title}>{category.name}</h2>
              <ul className={s.list}>
                {category.products.map((item) => {
                  return (
                    <li key={item.id} className={s.item}>
                      <Link className={s.link} to={`/products/${item.id}`}>
                        <img
                          className={s.image}
                          src={item.gallery[0]}
                          alt="name"
                        />
                        {!item.inStock && (
                          <p className={s.imageBlur}>OUT OF STOCK</p>
                        )}

                        <p className={s.itemName}>{item.name}</p>
                        <p className={s.price}>$ {item.prices[0].amount}</p>
                      </Link>
                      {item.inStock && (
                        <button
                          onClick={onCartBtnClick}
                          className={s.btn}
                          type="submit"
                        >
                          <img
                            id={item.id}
                            src={addToCartIcon}
                            alt="addToCartIcon"
                          />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        });
      }}
    </Query>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (product) => dispatch(addProduct(product)),
});

export default connect(null, mapDispatchToProps)(CardsList);
