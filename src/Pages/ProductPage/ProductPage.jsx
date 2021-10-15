import { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import s from "./ProductPage.module.css";

class ProductPage extends Component {
  state = {
    productId: "",
    selectImage: null,
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
          console.log(product);

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
                    alt=""
                  />
                </div>
                <div>
                  <h3 className={s.title}>{product.name}</h3>
                  {product.attributes.map((attr) => {
                    console.log(attr);
                    return (
                      <div key={attr.name} className={s.attributes}>
                        <p className={s.attributesTitle}>
                          {attr.name.toUpperCase()}:
                        </p>
                        <ul className={s.attributesList}>
                          {attr.items.map((item) => {
                            return (
                              <li
                                key={item.value}
                                className={
                                  attr.name !== "Color"
                                    ? s.attributesItem
                                    : s.attributesItemColor
                                }
                                style={{ backgroundColor: `${item.value}` }}
                              >
                                {attr.name !== "Color" && (
                                  <p className={s.value}>{item.displayValue}</p>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                  <p className={s.attributesTitle}>PRICE:</p>
                  {product.inStock ? (
                    <p className={s.price}> $ {product.prices[0].amount}</p>
                  ) : (
                    <p className={s.attributesTitle}> OUT OF STOCK</p>
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

export default ProductPage;
