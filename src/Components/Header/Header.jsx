import { PureComponent } from "react";
import Nav from "../Nav/Nav";
import s from "./Header.module.css";

export default class Header extends PureComponent {
  render() {
    return (
      <header className={s.header}>
        <Nav />
      </header>
    );
  }
}
