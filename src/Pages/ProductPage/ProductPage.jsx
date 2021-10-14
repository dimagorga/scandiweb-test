import { Query } from "react-apollo";
import gql from "graphql-tag";
import s from "./ProductPage.module.css";
import { useParams } from "react-router";

export default function ProductPage() {
  const { productId } = useParams();
  console.log(productId);
  return (
    <Query
      query={gql`
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
        console.log(data);
        console.log("hello");
        return <h1>Hello world</h1>;
      }}
    </Query>
  );
}
