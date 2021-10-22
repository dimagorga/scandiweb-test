import "./App.css";
import { Route, Switch, Redirect } from "react-router";
import Header from "./Components/Header/Header";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import CartPage from "./Pages/CartPage/CartPage";

function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/cart" component={CartPage} />
        <Route exact path="/:categoryName" component={CategoryPage} />
        <Route exact path="/products/:productId" component={ProductPage} />
      </Switch>
      <Redirect to="/women" />
    </div>
  );
}

export default App;
