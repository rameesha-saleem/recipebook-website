import { createContext, useContext, useState } from "react";
import {
  getUser,
  saveUser,
  removeUser,
} from "../utils/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);

  const login = (email, password) => {
    const storedUser = getUser();

    if (!storedUser) {
      return {
        success: false,
        message: "No account found. Please create an account first.",
      };
    }

    if (
      storedUser.email !== email ||
      storedUser.password !== password
    ) {
      return {
        success: false,
        message: "Email or password is incorrect.",
      };
    }

    const loggedUser = {
      name: storedUser.name,
      email: storedUser.email,
    };

    setUser(loggedUser);
    saveUser(loggedUser);

    return {
      success: true,
    };
  };

  const signup = (name, email, password) => {
    const existingUser = getUser();

    if (existingUser?.email === email) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      name,
      email,
      password,
    };

    saveUser(newUser);

    setUser({
      name,
      email,
    });

    return {
      success: true,
    };
  };

  const logout = () => {
    removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};