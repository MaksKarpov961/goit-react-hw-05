import NavLink from "./NavLink/NavLink";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/movies"}>Movie</NavLink>
    </nav>
  );
};

export default Navigation;
