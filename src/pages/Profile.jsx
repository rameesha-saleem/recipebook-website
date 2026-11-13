import {
  ChevronRight,
  Heart,
  LogOut,
  LockKeyhole,
  Pencil,
  ChefHat,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import {
  useRecipe,
} from "../context/RecipeContext";

import {
  getInitials,
} from "../utils/helpers";

const Profile = () => {
  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const {
    favorites,
    myRecipes,
  } = useRecipe();

  if (!user) {
    return (
      <div className="page profile-page">

        <div className="empty-state profile-login-state">

          <div className="profile-login-icon">
            👤
          </div>

          <h3>
            Welcome to your profile
          </h3>

          <p>
            Login to view your profile,
            recipes and favorites.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/auth")
            }
          >
            Login / Sign Up
          </button>

        </div>

      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="page profile-page">

      <section className="profile-card">

        <div className="profile-top">

          <div className="profile-avatar">
            {getInitials(
              user.name
            )}
          </div>

          <div className="profile-info">

            <span>
              MY PROFILE
            </span>

            <h1>
              {user.name}
            </h1>

            <p>
              {user.email}
            </p>

          </div>

          <button
            className="edit-profile-btn"
            type="button"
          >
            <Pencil size={16} />
            Edit Profile
          </button>

        </div>

        <div className="profile-stats">

          <div>
            <strong>
              {myRecipes.length}
            </strong>

            <span>
              My Recipes
            </span>
          </div>

          <div>
            <strong>
              {favorites.length}
            </strong>

            <span>
              Favorites
            </span>
          </div>

          <div>
            <strong>
              2026
            </strong>

            <span>
              Joined
            </span>
          </div>

        </div>

      </section>

      <section className="profile-options">

        <button
          onClick={() =>
            navigate("/my-recipes")
          }
        >
          <span className="option-icon">
            <ChefHat size={18} />
          </span>

          <span>
            <strong>
              My Recipes
            </strong>

            <small>
              Manage your recipes
            </small>
          </span>

          <ChevronRight size={18} />
        </button>

        <button
          onClick={() =>
            navigate("/favorites")
          }
        >
          <span className="option-icon">
            <Heart size={18} />
          </span>

          <span>
            <strong>
              Favorites
            </strong>

            <small>
              Your saved recipes
            </small>
          </span>

          <ChevronRight size={18} />
        </button>

        <button type="button">
          <span className="option-icon">
            <LockKeyhole size={18} />
          </span>

          <span>
            <strong>
              Change Password
            </strong>

            <small>
              Update your account password
            </small>
          </span>

          <ChevronRight size={18} />
        </button>

        <button
          className="logout-option"
          onClick={handleLogout}
        >
          <span className="option-icon">
            <LogOut size={18} />
          </span>

          <span>
            <strong>
              Logout
            </strong>

            <small>
              Sign out from your account
            </small>
          </span>

          <ChevronRight size={18} />
        </button>

      </section>

    </div>
  );
};

export default Profile;