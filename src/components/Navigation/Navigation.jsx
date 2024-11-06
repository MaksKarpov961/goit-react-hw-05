import NavLink from "./NavLink/NavLink";

const Navigation = () => {
  return (
    <nav>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/movies"}>Movie</NavLink>
    </nav>
  );
};

export default Navigation;
