import "./App.css";
import { Route, Switch } from "react-router";
import Header from "./Components/Header/Header";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import ProductPage from "./Pages/ProductPage/ProductPage";

function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/:categoryName" component={CategoryPage} />
        <Route exact path="/products/:productId" component={ProductPage} />
      </Switch>
    </div>
  );
}

export default App;
