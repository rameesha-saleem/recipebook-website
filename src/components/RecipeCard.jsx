import { Heart, Clock, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useRecipe } from "../context/RecipeContext";

const RecipeCard = ({
  recipe,
  showDelete = false,
  onDelete,
}) => {
  const { isFavorite, toggleFavorite } = useRecipe();

  const favorite = isFavorite(recipe.idMeal);

  return (
    <article className="recipe-card">

      <div className="recipe-card-image">

        <img
          src={
            recipe.strMealThumb ||
            recipe.image ||
            "/images/placeholder.jpg"
          }
          alt={recipe.strMeal}
        />

        <button
          className={`favorite-btn ${
            favorite ? "liked" : ""
          }`}
          onClick={() => toggleFavorite(recipe)}
          aria-label="Favorite recipe"
        >
          <Heart
            size={17}
            fill={favorite ? "currentColor" : "none"}
          />
        </button>

      </div>

      <div className="recipe-card-body">

        <span className="recipe-category">
          {recipe.strCategory || "Recipe"}
        </span>

        <Link
          to={`/recipe/${recipe.idMeal}`}
          className="recipe-title"
        >
          {recipe.strMeal}
        </Link>

        <div className="recipe-meta">

          <span>
            <Clock size={13} />
            30 min
          </span>

          <span>
            {recipe.strArea || "Homemade"}
          </span>

        </div>

        {showDelete && (
          <button
            className="delete-recipe-btn"
            onClick={() => onDelete(recipe.idMeal)}
          >
            <Trash2 size={14} />
            Delete
          </button>
        )}

        <Link
          to={`/recipe/${recipe.idMeal}`}
          className="view-recipe"
        >
          View Recipe
          <ArrowRight size={15} />
        </Link>

      </div>

    </article>
  );
};

export default RecipeCard;