import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <Link to="/" className="brand">
          <span className="brand-icon">🍳</span>

          <span className="brand-text">
            <strong>TastyBites</strong>
            <small>Good Food • Happy Life</small>
          </span>
        </Link>

        <nav className="nav-menu">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/recipes" className={navClass}>
            Recipes
          </NavLink>

          <NavLink to="/my-recipes" className={navClass}>
            My Recipes
          </NavLink>

          <NavLink to="/add-recipe" className={navClass}>
            Add Recipe
          </NavLink>

          <NavLink to="/favorites" className={navClass}>
            Favorites
          </NavLink>
        </nav>

        <div className="navbar-actions">

          <button
            className="nav-icon-btn"
            onClick={() => navigate("/search")}
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          <button
            className="profile-button"
            onClick={() => navigate("/profile")}
            aria-label="Profile"
          >
            <UserCircle size={23} />

            {user && (
              <span className="profile-name">
                {user.name?.split(" ")[0]}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};

export default Navbar;