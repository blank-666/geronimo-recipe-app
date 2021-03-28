import s from "./Header.module.scss";
import selectedBookmark from "../../icons/selected-bookmark.svg";
import logo from "../../icons/logo.png";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className={s.headerContainer}>
      <Link className={s.logo} to="/">
        <img src={logo} alt="" />
      </Link>
      <ul className={s.controlBar}>
        <li className={s.controlBarItem}>
          <Link to="/"> Home</Link>
        </li>
        <li className={s.controlBarItem}>
          <Link to="/favorites">
            <img src={selectedBookmark} alt="" />
            My favorite recipes
          </Link>
        </li>
        <li className={s.controlBarItem}>
          <Link className={s.button} to="/form">
            Add new recipe
          </Link>
        </li>
      </ul>
    </div>
  );
}
