import "./App.css";
import { Route, Switch } from "react-router";
import Header from "./Components/Header/Header";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import CartPage from "./Pages/CartPage/CartPage";
import { PureComponent } from "react";

class App extends PureComponent {
  render() {
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route path="/cart" component={CartPage} />
          <Route
            exact
            path="/:categoryName"
            render={(props) => <CategoryPage {...props} />}
          />
          <Route exact path="/products/:productId" component={ProductPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
