const FAVORITES_KEY = "tastybites_favorites";
const MY_RECIPES_KEY = "tastybites_my_recipes";
const USER_KEY = "tastybites_user";

export const getFavorites = () => {
  try {
    return (
      JSON.parse(
        localStorage.getItem(FAVORITES_KEY)
      ) || []
    );
  } catch {
    return [];
  }
};

export const saveFavorites = (favorites) => {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  );
};

export const getMyRecipes = () => {
  try {
    return (
      JSON.parse(
        localStorage.getItem(MY_RECIPES_KEY)
      ) || []
    );
  } catch {
    return [];
  }
};

export const saveMyRecipes = (recipes) => {
  localStorage.setItem(
    MY_RECIPES_KEY,
    JSON.stringify(recipes)
  );
};

export const getUser = () => {
  try {
    return (
      JSON.parse(
        localStorage.getItem(USER_KEY)
      ) || null
    );
  } catch {
    return null;
  }
};

export const saveUser = (user) => {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};