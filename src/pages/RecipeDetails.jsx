import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Heart,
  Clock,
  ChefHat,
  Users,
  ArrowLeft,
  PlayCircle,
} from "lucide-react";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import {
  getMealById,
} from "../services/mealApi";

import {
  getIngredients,
  getYoutubeId,
} from "../utils/helpers";

import {
  getMyRecipes,
} from "../utils/localStorage";

import { useRecipe } from "../context/RecipeContext";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isFavorite,
    toggleFavorite,
  } = useRecipe();

  const [recipe, setRecipe] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true);
        setError("");

        // Local recipe first
        if (id.startsWith("local-")) {
          const localRecipes =
            getMyRecipes();

          const localRecipe =
            localRecipes.find(
              (item) =>
                item.idMeal === id
            );

          if (!localRecipe) {
            throw new Error(
              "Recipe not found."
            );
          }

          setRecipe(localRecipe);
          return;
        }

        // API recipe
        const data =
          await getMealById(id);

        if (!data) {
          throw new Error(
            "Recipe not found."
          );
        }

        setRecipe(data);
      } catch (err) {
        setError(
          err.message ||
            "Failed to load recipe."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="page">
        <ErrorMessage
          message={error}
        />
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  const ingredients =
    getIngredients(recipe);

  const favorite =
    isFavorite(recipe.idMeal);

  const youtubeId =
    getYoutubeId(
      recipe.strYoutube
    );

  const instructions =
    recipe.strInstructions ||
    recipe.instructions ||
    "";

  const description =
    recipe.strCategory
      ? `A delicious ${recipe.strCategory.toLowerCase()} recipe from ${recipe.strArea || "home kitchen"}.`
      : "A delicious homemade recipe made with simple ingredients and full of flavor.";

  return (
    <div className="page recipe-details-page">

      {/* Back */}
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={17} />
        Back to Recipes
      </button>

      {/* TOP */}
      <section className="recipe-details">

        {/* IMAGE */}
        <div className="details-image">

          <img
            src={
              recipe.strMealThumb ||
              recipe.image ||
              "/images/placeholder.jpg"
            }
            alt={recipe.strMeal}
          />

          <button
            type="button"
            className={`details-favorite ${
              favorite ? "liked" : ""
            }`}
            onClick={() =>
              toggleFavorite(recipe)
            }
            aria-label="Favorite recipe"
          >
            <Heart
              size={21}
              fill={
                favorite
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

        </div>

        {/* INFORMATION */}
        <div className="details-main">

          <span className="details-category">
            {recipe.strCategory ||
              recipe.category ||
              "Homemade"}
          </span>

          <h1>
            {recipe.strMeal}
          </h1>

          <p className="details-description">
            {description}
          </p>

          <div className="details-meta">

            <span>
              <Clock size={17} />
              30 min
            </span>

            <span>
              <ChefHat size={17} />
              {recipe.strArea ||
                recipe.area ||
                "Homemade"}
            </span>

            <span>
              <Users size={17} />
              4 servings
            </span>

          </div>

          <div className="details-action-row">

            <button
              className={`favorite-action ${
                favorite ? "liked" : ""
              }`}
              onClick={() =>
                toggleFavorite(recipe)
              }
            >
              <Heart
                size={17}
                fill={
                  favorite
                    ? "currentColor"
                    : "none"
                }
              />

              {favorite
                ? "Saved"
                : "Save Recipe"}
            </button>

          </div>

          <div className="details-note">
            <span>✦</span>

            <div>
              <strong>
                Delicious Recipes
              </strong>

              <p>
                Discover simple ingredients,
                beautiful flavors and recipes
                you will love to make again.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* INGREDIENTS + INSTRUCTIONS */}
      <section className="recipe-content">

        {/* Ingredients */}
        <div className="ingredients">

          <div className="content-heading">
            <span className="section-label">
              WHAT YOU NEED
            </span>

            <h2>
              Ingredients
            </h2>
          </div>

          <div className="ingredients-grid">

            {ingredients.length > 0 ? (
              ingredients.map(
                (item, index) => (
                  <div
                    className="ingredient-card"
                    key={index}
                  >

                    <span className="ingredient-number">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <div className="ingredient-info">

                      <h4>
                        {item.ingredient}
                      </h4>

                      <p>
                        {item.measure ||
                          "As needed"}
                      </p>

                    </div>

                  </div>
                )
              )
            ) : (
              <p>
                Ingredients information
                is not available.
              </p>
            )}

          </div>

        </div>

        {/* Instructions */}
        <div className="instructions">

          <div className="content-heading">
            <span className="section-label">
              LET'S COOK
            </span>

            <h2>
              Instructions
            </h2>
          </div>

          <div className="instruction-list">

            {instructions
              .split(/\r?\n/)
              .filter(Boolean)
              .map(
                (step, index) => (
                  <div
                    className="instruction-step"
                    key={index}
                  >

                    <span>
                      {index + 1}
                    </span>

                    <p>
                      {step}
                    </p>

                  </div>
                )
              )}

          </div>

        </div>

      </section>

      {/* VIDEO */}
      {youtubeId && (
        <section className="video-section">

          <div className="content-heading">
            <span className="section-label">
              WATCH & COOK
            </span>

            <h2>
              Recipe Video
            </h2>
          </div>

          <div className="video-wrapper">

            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={recipe.strMeal}
              allowFullScreen
            />

          </div>

        </section>
      )}

    </div>
  );
};

export default RecipeDetails;