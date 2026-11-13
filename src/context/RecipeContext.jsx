import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getFavorites,
  saveFavorites,
  getMyRecipes,
  saveMyRecipes,
} from "../utils/localStorage";

const RecipeContext =
  createContext(null);

export const RecipeProvider = ({
  children,
}) => {
  const [favorites, setFavorites] =
    useState(() =>
      getFavorites()
    );

  const [myRecipes, setMyRecipes] =
    useState(() =>
      getMyRecipes()
    );

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    saveMyRecipes(myRecipes);
  }, [myRecipes]);

  const isFavorite = (id) => {
    return favorites.some(
      (recipe) =>
        recipe.idMeal === id
    );
  };

  const toggleFavorite = (
    recipe
  ) => {
    setFavorites((current) => {
      const exists =
        current.some(
          (item) =>
            item.idMeal ===
            recipe.idMeal
        );

      if (exists) {
        return current.filter(
          (item) =>
            item.idMeal !==
            recipe.idMeal
        );
      }

      return [
        ...current,
        recipe,
      ];
    });
  };

  const addMyRecipe = (
    recipe
  ) => {
    setMyRecipes((current) => [
      ...current,
      recipe,
    ]);
  };

  const deleteMyRecipe = (
    id
  ) => {
    setMyRecipes((current) =>
      current.filter(
        (recipe) =>
          recipe.idMeal !== id
      )
    );
  };

  return (
    <RecipeContext.Provider
      value={{
        favorites,
        myRecipes,
        isFavorite,
        toggleFavorite,
        addMyRecipe,
        deleteMyRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => {
  const context =
    useContext(RecipeContext);

  if (!context) {
    throw new Error(
      "useRecipe must be used inside RecipeProvider"
    );
  }

  return context;
};