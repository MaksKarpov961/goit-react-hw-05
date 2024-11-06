import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children }) => {
  const location = useLocation();

  return (
    <Link to={to} state={{ from: location.pathname }}>
      {children}
    </Link>
  );
};

export default NavLink;
