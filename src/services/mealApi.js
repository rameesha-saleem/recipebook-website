const API_URL =
  "https://www.themealdb.com/api/json/v1/1";

const fetchData = async (url, errorMessage) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  const data = await response.json();

  return data;
};

// All recipes
export const getAllMeals = async () => {
  const data = await fetchData(
    `${API_URL}/search.php?s=`,
    "Failed to fetch recipes."
  );

  return data.meals || [];
};

// Popular recipes
export const getPopularMeals = async () => {
  const data = await fetchData(
    `${API_URL}/search.php?s=a`,
    "Failed to fetch popular recipes."
  );

  return data.meals || [];
};

// Single recipe
export const getMealById = async (id) => {
  const data = await fetchData(
    `${API_URL}/lookup.php?i=${encodeURIComponent(id)}`,
    "Failed to fetch recipe details."
  );

  return data.meals?.[0] || null;
};

// Categories
export const getCategories = async () => {
  const data = await fetchData(
    `${API_URL}/categories.php`,
    "Failed to fetch categories."
  );

  return data.categories || [];
};

// Recipes by category
export const getMealsByCategory = async (category) => {
  const data = await fetchData(
    `${API_URL}/filter.php?c=${encodeURIComponent(category)}`,
    "Failed to fetch category recipes."
  );

  return data.meals || [];
};

// Search
export const searchMeals = async (query) => {
  const data = await fetchData(
    `${API_URL}/search.php?s=${encodeURIComponent(query)}`,
    "Failed to search recipes."
  );

  return data.meals || [];
};

// Recipes by first letter
export const getMealsByLetter = async (letter) => {
  const data = await fetchData(
    `${API_URL}/search.php?f=${encodeURIComponent(letter)}`,
    "Failed to fetch recipes."
  );

  return data.meals || [];
};