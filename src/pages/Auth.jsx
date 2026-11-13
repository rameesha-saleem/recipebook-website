import { useState } from "react";
import {
  ChefHat,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();

  const {
    login,
    signup,
  } = useAuth();

  const [mode, setMode] =
    useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (mode === "signup") {
      if (
        !form.name.trim() ||
        !form.email.trim() ||
        !form.password
      ) {
        setError(
          "Please fill in all required fields."
        );
        return;
      }

      if (form.password.length < 6) {
        setError(
          "Password must be at least 6 characters long."
        );
        return;
      }

      if (
        form.password !==
        form.confirmPassword
      ) {
        setError(
          "Passwords do not match."
        );
        return;
      }

      const result = signup(
        form.name,
        form.email,
        form.password
      );

      if (!result.success) {
        setError(result.message);
        return;
      }

      navigate("/");
      return;
    }

    if (
      !form.email.trim() ||
      !form.password
    ) {
      setError(
        "Please enter email and password."
      );
      return;
    }

    const result = login(
      form.email,
      form.password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  };

  const switchMode = () => {
    setMode((current) =>
      current === "login"
        ? "signup"
        : "login"
    );

    setError("");

    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="auth-page">

      <div className="auth-decoration auth-decoration-one">
        ❧
      </div>

      <div className="auth-decoration auth-decoration-two">
        ✦
      </div>

      <div className="auth-card">

        <div className="auth-icon">
          <ChefHat size={25} />
        </div>

        <div className="auth-heading">

          <span>
            Welcome to TastyBites
          </span>

          <h1>
            {mode === "login"
              ? "Welcome Back"
              : "Create Account"}
          </h1>

          <p>
            {mode === "login"
              ? "Sign in to continue to your kitchen."
              : "Join us and start creating delicious recipes."}
          </p>

        </div>

        <div className="auth-tabs">

          <button
            type="button"
            className={
              mode === "login"
                ? "active"
                : ""
            }
            onClick={() => {
              setMode("login");
              setError("");
            }}
          >
            Login
          </button>

          <button
            type="button"
            className={
              mode === "signup"
                ? "active"
                : ""
            }
            onClick={() => {
              setMode("signup");
              setError("");
            }}
          >
            Sign Up
          </button>

        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {mode === "signup" && (
            <div className="form-group">

              <label>
                Full Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />

            </div>
          )}

          <div className="form-group">

            <label>
              Email Address <span>*</span>
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

          </div>

          <div className="form-group">

            <label>
              Password <span>*</span>
            </label>

            <div className="password-field">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) =>
                      !current
                  )
                }
                aria-label="Show password"
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </div>

          {mode === "signup" && (
            <div className="form-group">

              <label>
                Confirm Password{" "}
                <span>*</span>
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={
                  form.confirmPassword
                }
                onChange={handleChange}
                placeholder="Confirm your password"
              />

            </div>
          )}

          {mode === "login" && (
            <div className="auth-extra">

              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <button type="button">
                Forgot password?
              </button>

            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
          >
            {mode === "login"
              ? "Login"
              : "Create Account"}
          </button>

        </form>

        <div className="auth-switch">

          <span>
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>

          <button
            type="button"
            onClick={switchMode}
          >
            {mode === "login"
              ? "Sign Up"
              : "Login"}
          </button>

        </div>

        <Link
          to="/"
          className="back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
};

export default Auth;