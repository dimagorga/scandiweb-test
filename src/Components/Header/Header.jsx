import Nav from "../Nav/Nav";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.header}>
      <Nav />
    </header>
  );
}
