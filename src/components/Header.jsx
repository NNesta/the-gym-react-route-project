import { NavLink, Link } from "react-router-dom";
import avatarImg from "../assets/images/avatar-icon.png";

const Header = () => {
  const activeStyle = {
    "font-weight": "bold",
    "text-decoration": "underline",
    color: "#161616",
  };
  const fakeLogout = () => {
    localStorage.removeItem("isLoggedIn");
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
          <Link to="login" className="login-link">
            <img alt="img" src={avatarImg} className="login-icon" />
          </Link>
          {localStorage.getItem("isLoggedIn") && (
            <button onClick={fakeLogout}>X</button>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
