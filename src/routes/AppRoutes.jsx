import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import RecipeDetails from "../pages/RecipeDetails";
import Favorites from "../pages/Favorites";
import SearchResults from "../pages/SearchResults";
import MyRecipes from "../pages/MyRecipes";
import AddRecipe from "../pages/AddRecipe";
import Profile from "../pages/Profile";
import Auth from "../pages/Auth";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/recipes" element={<Recipes />} />

      <Route
        path="/recipe/:id"
        element={<RecipeDetails />}
      />

      <Route
        path="/favorites"
        element={<Favorites />}
      />

      <Route
        path="/search"
        element={<SearchResults />}
      />

      <Route
        path="/my-recipes"
        element={<MyRecipes />}
      />

      <Route
        path="/add-recipe"
        element={<AddRecipe />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/auth"
        element={<Auth />}
      />

      <Route
        path="*"
        element={<Home />}
      />

    </Routes>
  );
};

export default AppRoutes;