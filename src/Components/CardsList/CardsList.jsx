import s from "./CardsList.module.css";
import { Query } from "react-apollo";
import { Component } from "react";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addProduct } from "../../redux/product/product-actions";
import CardsItem from "../CardsItem/CardsItem";

class CardsList extends Component {
  state = {
    category: "all",
  };

  onCategoryBtnClick = (e) => {
    this.setState({ category: e.target.textContent });
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
    return (
      <Query
        query={gql`
          query {
            category {
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
          const { category, categories } = data;

          return (
            <div>
              <div className={s.categoryButtons}>
                <button
                  className={s.categoryBtn}
                  onClick={this.onCategoryBtnClick}
                  key={category.name}
                >
                  {category.name}
                </button>
                {categories.map((cat) => {
                  return (
                    <button
                      className={s.categoryBtn}
                      onClick={this.onCategoryBtnClick}
                      key={cat.name}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
              {this.state.category === category.name ? (
                <div key={category.name}>
                  <h2 className={s.title}>{category.name}</h2>
                  <ul className={s.list}>
                    {category.products.map((item) => {
                      return (
                        <CardsItem
                          key={item.id}
                          item={item}
                          onCartBtnClick={this.onCartBtnClick}
                        />
                      );
                    })}
                  </ul>
                </div>
              ) : (
                categories.map(
                  (cat) =>
                    cat.name === this.state.category && (
                      <div key={cat.name}>
                        <h2 className={s.title}>{cat.name}</h2>
                        <ul className={s.list}>
                          {cat.products.map((item) => {
                            return (
                              <CardsItem
                                key={item.id}
                                item={item}
                                onCartBtnClick={this.onCartBtnClick}
                              />
                            );
                          })}
                        </ul>
                      </div>
                    )
                )
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (product) => dispatch(addProduct(product)),
});

export default connect(null, mapDispatchToProps)(CardsList);
