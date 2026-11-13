import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import {
  getAllMeals,
  getMealsByCategory,
  getCategories,
} from "../services/mealApi";

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadCategories();
  }, []);

  // Recipes
  useEffect(() => {
    const category = searchParams.get("category");

    if (category) {
      setActiveCategory(category);
      loadCategory(category);
    } else {
      setActiveCategory("All");
      loadAllRecipes();
    }
  }, [searchParams]);

  const loadAllRecipes = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllMeals();

      setRecipes(data || []);
    } catch (err) {
      setError(
        err.message || "Failed to load recipes."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadCategory = async (category) => {
    try {
      setLoading(true);
      setError("");

      const data = await getMealsByCategory(category);

      setRecipes(data || []);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load category recipes."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category,
      });
    }
  };

  return (
    <div className="page recipes-page">

      {/* Page Header */}
      <section className="recipes-hero">

        <span className="page-label">
          DISCOVER
        </span>

        <h1>Explore Recipes</h1>

        <p>
          Find delicious meals from different cuisines
          and categories.
        </p>

      </section>

      {/* Category Buttons */}
      <section className="recipe-categories">

        <div className="category-buttons">

          <button
            type="button"
            className={
              activeCategory === "All"
                ? "active"
                : ""
            }
            onClick={() =>
              handleCategoryChange("All")
            }
          >
            All
          </button>

          {categories.map((category) => (
            <button
              type="button"
              key={category.idCategory}
              className={
                activeCategory ===
                category.strCategory
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleCategoryChange(
                  category.strCategory
                )
              }
            >
              {category.strCategory}
            </button>
          ))}

        </div>

      </section>

      {/* Recipe Section */}
      <section className="recipes-section">

        <div className="recipes-heading">

          <div>
            <span className="section-label">
              {activeCategory === "All"
                ? "OUR COLLECTION"
                : `${activeCategory.toUpperCase()} COLLECTION`}
            </span>

            <h2>
              {activeCategory === "All"
                ? "All Recipes"
                : `${activeCategory} Recipes`}
            </h2>
          </div>

          <span className="recipe-count">
            {recipes.length} recipes
          </span>

        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : recipes.length === 0 ? (
          <div className="empty-state">

            <span>🍽️</span>

            <h3>No recipes found</h3>

            <p>
              Try another category or search for
              another meal.
            </p>

            <Link
              to="/recipes"
              className="primary-btn"
            >
              View All Recipes
            </Link>

          </div>
        ) : (
          <div className="recipe-grid">

            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
              />
            ))}

          </div>
        )}

      </section>

    </div>
  );
};

export default Recipes;