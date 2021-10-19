import { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addProduct } from "../../redux/product/product-actions";
import s from "./ProductPage.module.css";

class ProductPage extends Component {
  state = {
    productId: "",
    selectImage: null,
    isShowMore: false,
    selectedAtribute: [],
  };

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.setState({ productId });
  }

  onSelectImage = (e) => {
    const image = e.target.src;
    return this.setState({
      selectImage: image,
    });
  };

  onShowMore = () => {
    this.setState((prev) => {
      console.log(prev);
      return { ...prev, isShowMore: !prev.isShowMore };
    });
  };

  setactiveAttribute = (id) => {
    this.setState((prev) => {
      if (!this.state.selectedAtribute.includes(id)) {
        return { ...prev, selectedAtribute: [...prev.selectedAtribute, id] };
      } else {
        return {
          ...prev,
          selectedAtribute: prev.selectedAtribute.splice(1, 0),
        };
      }
    });
  };

  onSubmitProduct = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      id: uuidv4(),
      name: this.state.productId,
      attributes: [...this.state.selectedAtribute],
      value: 1,
    });
    this.setState({ selectedAtribute: [] });
  };

  render() {
    return (
      <Query
        query={gql`
        query {
          product(id: "${this.state.productId}") {
            name
            inStock
            gallery
            description
            category
            attributes {
              
              name
              items {
                id
                value
                displayValue
              }
            }
            prices {
              amount
              currency
            }
            brand
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
              <div className={s.wrapper}>
                <div className={s.imagesSection}>
                  <ul className={s.imagesList}>
                    {product &&
                      product.gallery.map((image) => {
                        return (
                          <li
                            onClick={this.onSelectImage}
                            key={image}
                            className={s.imagesListItem}
                          >
                            <img
                              className={s.selectImage}
                              src={image}
                              alt={image}
                            />
                          </li>
                        );
                      })}
                  </ul>
                  <img
                    className={s.selectedImage}
                    src={
                      !this.state.selectImage
                        ? product.gallery[0]
                        : this.state.selectImage
                    }
                    alt={
                      !this.state.selectImage
                        ? product.gallery[0]
                        : this.state.selectImage
                    }
                  />
                </div>

                <div>
                  <h3 className={s.title}>{product.name}</h3>
                  {product.attributes.map((attr) => {
                    return (
                      <div key={attr.name} className={s.attributes}>
                        <h2 className={s.attributesTitle}>
                          {attr.name.toUpperCase()}:
                        </h2>
                        <div className={s.attributesList}>
                          {attr.items.map((item) => {
                            const attributesClasses = [s.attributesItem];
                            if (this.state.selectedAtribute.includes(item.id)) {
                              attributesClasses.push(s.attributesItem__active);
                            }
                            return (
                              <button
                                id={item.id}
                                onClick={() => this.setactiveAttribute(item.id)}
                                key={item.value}
                                className={attributesClasses.join(" ")}
                                style={{
                                  backgroundColor: `${item.value}`,
                                }}
                              >
                                <span
                                  className={s.value}
                                  style={{
                                    opacity: attr.name === "Color" && 0,
                                  }}
                                >
                                  {item.displayValue}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  <p className={s.attributesTitle}>PRICE:</p>
                  <p className={s.price}> $ {product.prices[0].amount}</p>
                  <button
                    type="submit"
                    onClick={this.onSubmitProduct}
                    disabled={!product.inStock && true}
                    className={s.submitBtn}
                  >
                    {!product.inStock ? "OUT OF STOCK" : "ADD TO CART"}
                  </button>
                  {product.description &&
                    (!this.state.isShowMore &&
                    product.description.length > 300 ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.description.slice(0, 300) + "...",
                        }}
                      />
                    ) : (
                      <div
                        className={s.description}
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    ))}
                  {product.description.length > 300 && (
                    <button
                      className={s.showMoreBtn}
                      type="button"
                      onClick={this.onShowMore}
                    >
                      {!this.state.isShowMore ? "Show more" : "Hide"}
                    </button>
                  )}
                </div>
              </div>
            )
          );
        }}
      </Query>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     products: state.products,
//   };
// };
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (product) => dispatch(addProduct(product)),
});

export default connect(null, mapDispatchToProps)(ProductPage);

// attr.name !== "Color"
//   ? s.attributesItem
//   : s.attributesItemColor
