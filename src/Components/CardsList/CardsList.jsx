import { Query } from "react-apollo";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  allProductsRequest,
  productsCategoriesRequest,
} from "../../services/gql-requests";
import { addProduct } from "../../redux/product/product-actions";
import CategoryList from "../CategoryList/CategoryList";

class CardsList extends PureComponent {
  changeCategory = (category) => (category ? category : null);

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
    const { pageCategory } = this.props;
    return (
      <Query
        query={
          pageCategory === "/all"
            ? allProductsRequest()
            : productsCategoriesRequest()
        }
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error : </p>;
          const allCategories = this.changeCategory(data);

          return (
            <div>
              {allCategories.category ? (
                <CategoryList
                  key={allCategories.category.name}
                  category={allCategories.category}
                />
              ) : (
                allCategories.categories.map(
                  (cat) =>
                    `/${cat.name}` === pageCategory && (
                      <CategoryList key={cat.name} category={cat} />
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
