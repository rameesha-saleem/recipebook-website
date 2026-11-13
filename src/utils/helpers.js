export const getIngredients = (meal) => {
  const ingredients = [];

  // Local recipe
  if (meal?.ingredientsText) {
    return meal.ingredientsText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => ({
        ingredient: item,
        measure: "",
      }));
  }

  // TheMealDB recipe
  for (let i = 1; i <= 20; i++) {
    const ingredient =
      meal?.[`strIngredient${i}`];

    const measure =
      meal?.[`strMeasure${i}`];

    if (
      ingredient &&
      ingredient.trim()
    ) {
      ingredients.push({
        ingredient:
          ingredient.trim(),

        measure:
          measure?.trim() || "",
      });
    }
  }

  return ingredients;
};

export const getYoutubeId = (url) => {
  if (!url) return null;

  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/
  );

  return match ? match[1] : null;
};

export const truncateText = (
  text = "",
  length = 100
) => {
  if (text.length <= length) {
    return text;
  }

  return `${text.substring(
    0,
    length
  )}...`;
};

export const getInitials = (
  name = ""
) => {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};