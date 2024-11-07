import { Link, useLocation } from "react-router-dom";
import s from "./NavLink.module.css";
const NavLink = ({ to, children }) => {
  const location = useLocation();

  return (
    <Link className={s.link} to={to} state={{ from: location.pathname }}>
      {children}
    </Link>
  );
};

export default NavLink;
