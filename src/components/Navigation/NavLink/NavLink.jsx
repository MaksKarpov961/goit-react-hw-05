import { Link } from "react-router-dom";

const NavLink = ({ to, children }) => {
  return (
    <>
      <Link to={to}>{children}</Link>
    </>
  );
};

export default NavLink;
