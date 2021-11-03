import { NavLink, withRouter } from "react-router-dom";

import { PureComponent } from "react";
import { Query } from "react-apollo";
import s from "./Nav.module.css";
import logo from "../../Images/logo.jpg";
import NavCartButton from "../NavCartButton/NavCartButton";
import NavCurrencyBtn from "../NavCurrencyBtn/NavCurrencyBtn";
import { categoriesNameRequest } from "../../services/gql-requests";

class Nav extends PureComponent {
  goBack = () => {
    const { history, location } = this.props;
    return history.push(location?.state?.from ?? "/all");
  };
  render() {
    return (
      <Query query={categoriesNameRequest()}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error : </p>;
          const { category, categories } = data;
          return (
            <div className={s.wrapper}>
              <ul className={s.list}>
                <li className={s.item}>
                  <NavLink
                    to={{
                      pathname: `/${category.name}`,
                      state: { from: this.props.location },
                    }}
                    className={s.link}
                    activeClassName={s.activeLink}
                  >
                    {category.name.toUpperCase()}
                  </NavLink>
                </li>
                {categories.map((cat) => {
                  return (
                    <li key={cat.name} className={s.item}>
                      <NavLink
                        to={{
                          pathname: `/${cat.name}`,
                          state: { from: this.props.location },
                        }}
                        className={s.link}
                        activeClassName={s.activeLink}
                      >
                        {cat.name.toUpperCase()}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <button className={s.goBackBtn} onClick={this.goBack}>
                <img className={s.logo} src={logo} alt="logo" />
              </button>

              <ul className={s.secondaryNav}>
                <li>
                  <NavCurrencyBtn />
                </li>
                <li>
                  <NavCartButton />
                </li>
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Nav);
