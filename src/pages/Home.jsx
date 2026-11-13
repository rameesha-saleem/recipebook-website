import { useEffect, useState } from "react";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import {
  getCategories,
  getPopularMeals,
  getAllMeals,
} from "../services/mealApi";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [heroRecipes, setHeroRecipes] = useState([]);

  const [heroIndex, setHeroIndex] = useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =========================
     HERO AUTO CHANGE
  ========================= */

  useEffect(() => {
    if (heroRecipes.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setHeroIndex(
        (current) =>
          (current + 1) %
          heroRecipes.length
      );
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  }, [heroRecipes.length]);

  /* =========================
     HOME DATA
  ========================= */

  useEffect(() => {
    const loadHome = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          recipeData,
          categoryData,
          allRecipeData,
        ] = await Promise.all([
          getPopularMeals(),
          getCategories(),
          getAllMeals(),
        ]);

        const allMeals =
          allRecipeData || [];

        /*
          Random recipes for hero.
          This gives the hero many
          different food images.
        */

        const shuffledRecipes = [
          ...allMeals,
        ]
          .sort(
            () => Math.random() - 0.5
          )
          .slice(0, 18);

        setRecipes(
          recipeData || []
        );

        setCategories(
          categoryData || []
        );

        setHeroRecipes(
          shuffledRecipes
        );
      } catch (err) {
        setError(
          err.message ||
            "Failed to load homepage."
        );
      } finally {
        setLoading(false);
      }
    };

    loadHome();
  }, []);

  const heroRecipe =
    heroRecipes[heroIndex];

  return (
    <div className="page home-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="hero">

        {/* LEFT SIDE */}

        <div className="hero-content">

          <span className="eyebrow">
            <Sparkles size={14} />
            GOOD FOOD • HAPPY LIFE
          </span>

          <h1>
            Discover
            <span> Delicious </span>
            Recipes
          </h1>

          <p>
            Find your next favorite meal
            from delicious recipes around
            the world.
          </p>

          <SearchBar large />

          <div className="hero-tags">
            <span>Italian</span>
            <span>Chinese</span>
            <span>Indian</span>
            <span>Desserts</span>
          </div>

        </div>

        {/* RIGHT SIDE — REAL RECIPE IMAGE */}

        <div className="hero-image">

          {heroRecipe && (
            <>
              <img
                key={heroRecipe.idMeal}
                src={
                  heroRecipe.strMealThumb
                }
                alt={
                  heroRecipe.strMeal
                }
              />

              <div className="hero-image-overlay"></div>

              <div className="hero-recipe-info">

                <span>
                  {heroRecipe.strCategory ||
                    "Recipe"}
                </span>

                <h3>
                  {heroRecipe.strMeal}
                </h3>

                <Link
                  to={`/recipe/${heroRecipe.idMeal}`}
                >
                  View Recipe
                  <ArrowRight
                    size={14}
                  />
                </Link>

              </div>
            </>
          )}

        </div>

      </section>

      {/* =========================
          HOME CONTENT
      ========================= */}

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage
          message={error}
        />
      ) : (
        <>

          {/* =========================
              CATEGORIES
          ========================= */}

          <section className="section category-section">

            <div className="section-heading">

              <div>

                <span className="section-label">
                  EXPLORE
                </span>

                <h2>
                  Browse Categories
                </h2>

              </div>

              <Link
                to="/recipes"
                className="view-all"
              >
                All Categories
                <ArrowRight
                  size={16}
                />
              </Link>

            </div>

            <div className="category-grid">

              {categories
                .slice(0, 8)
                .map(
                  (category) => (
                    <CategoryCard
                      category={
                        category
                      }
                      key={
                        category.idCategory
                      }
                    />
                  )
                )}

            </div>

          </section>

          {/* =========================
              POPULAR RECIPES
          ========================= */}

          <section className="section">

            <div className="section-heading">

              <div>

                <span className="section-label">
                  FRESH FROM THE KITCHEN
                </span>

                <h2>
                  Popular Recipes
                </h2>

              </div>

              <Link
                to="/recipes"
                className="view-all"
              >
                View All
                <ArrowRight
                  size={16}
                />
              </Link>

            </div>

            <div className="recipe-grid">

              {recipes
                .slice(0, 8)
                .map(
                  (recipe) => (
                    <RecipeCard
                      recipe={recipe}
                      key={
                        recipe.idMeal
                      }
                    />
                  )
                )}

            </div>

          </section>

        </>
      )}

    </div>
  );
};

export default Home;