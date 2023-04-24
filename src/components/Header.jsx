import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const activeStyle = {
    "font-weight": "bold",
    "text-decoration": "underline",
    color: "#161616",
  };
  return (
    <div>
      <header>
        <Link className="site-logo" to="/">
          #VanLife
        </Link>
        <nav>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            to="/host"
          >
            Host
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            to="/vans"
          >
            Vans
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            to="/about"
          >
            About
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Header;
