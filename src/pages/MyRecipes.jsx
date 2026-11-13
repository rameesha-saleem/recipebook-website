import {
  Link,
} from "react-router-dom";

import {
  Plus,
} from "lucide-react";

import RecipeCard from "../components/RecipeCard";

import {
  useRecipe,
} from "../context/RecipeContext";

const MyRecipes = () => {
  const {
    myRecipes,
    deleteMyRecipe,
  } = useRecipe();

  return (
    <div className="page my-recipes-page">

      <section className="page-header my-recipes-header">

        <div>
          <span className="section-label">
            YOUR KITCHEN
          </span>

          <h1>
            My Recipes
          </h1>

          <p>
            Recipes you have created
            and saved yourself.
          </p>
        </div>

        <Link
          to="/add-recipe"
          className="primary-btn"
        >
          <Plus size={17} />
          Add Recipe
        </Link>

      </section>

      <section className="section">

        {myRecipes.length === 0 ? (
          <div className="empty-state my-recipes-empty">

            <span>👩‍🍳</span>

            <h3>
              Your kitchen is empty
            </h3>

            <p>
              Create your first recipe
              and keep your own collection
              here.
            </p>

            <Link
              to="/add-recipe"
              className="primary-btn"
            >
              Create Recipe
            </Link>

          </div>
        ) : (
          <div className="recipe-grid">

            {myRecipes.map(
              (recipe) => (
                <RecipeCard
                  recipe={recipe}
                  key={
                    recipe.idMeal
                  }
                  showDelete
                  onDelete={
                    deleteMyRecipe
                  }
                />
              )
            )}

          </div>
        )}

      </section>

    </div>
  );
};

export default MyRecipes;