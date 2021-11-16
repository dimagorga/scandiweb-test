import gql from "graphql-tag";

const allProductsRequest = () => gql`
  query {
    category {
      name
      products {
        id
        attributes {
          name
        }
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
`;

const productsCategoriesRequest = () => gql`
  query {
    categories {
      name
      products {
        id
        attributes {
          name
        }
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
`;
const categoriesNameRequest = () => gql`
  query {
    category {
      name
    }
    categories {
      name
    }
  }
`;
const productAttributesRequest = (itemName) => gql`
                query {
                  product(id: "${itemName}") {            
                    name            
                    gallery
                    prices {
                      amount
                      currency
                    }
                  }
                }
              `;

const currenciesRequest = () => gql`
  query {
    currencies
  }
`;

const pricesRequest = () => gql`
  query {
    category {
      products {
        id
        prices {
          currency
          amount
        }
      }
    }
  }
`;
const productRequest = (productId) => gql`
        query {
          product(id: "${productId}") {
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
      `;

export {
  allProductsRequest,
  productsCategoriesRequest,
  categoriesNameRequest,
  productAttributesRequest,
  currenciesRequest,
  pricesRequest,
  productRequest,
};
