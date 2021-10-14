import "./App.css";
import { Route, Switch } from "react-router";
import Header from "./Components/Header/Header";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";

function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/:categoryName" component={CategoryPage} />
      </Switch>
    </div>
  );
}

export default App;
