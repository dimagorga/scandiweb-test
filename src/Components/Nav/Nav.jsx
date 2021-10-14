import { NavLink } from "react-router-dom";
import s from "./Nav.module.css";
import logo from "../../Images/logo.jpg";
import { ReactComponent as CartIcon } from "../../Images/cartIcon.svg";

export default function Nav() {
  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink
            to="/women"
            className={s.link}
            activeClassName={s.activeLink}
          >
            WOMEN
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/men" className={s.link} activeClassName={s.activeLink}>
            MEN
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/kids" className={s.link} activeClassName={s.activeLink}>
            KIDS
          </NavLink>
        </li>
      </ul>
      <img className={s.logo} src={logo} alt="logo" />
      <ul className={s.secondaryNav}>
        <li>
          <p className={s.currency}>
            $<span></span>^
          </p>
        </li>
        <li>
          <CartIcon className={s.cartIcon} />
        </li>
      </ul>
    </div>
  );
}
