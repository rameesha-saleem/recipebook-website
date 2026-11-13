import RecipeCard from "../components/RecipeCard";
import { useRecipe } from "../context/RecipeContext";

const Favorites = () => {
  const { favorites } = useRecipe();

  return (
    <div className="page">
      <section className="page-header favorites-header">
        <span className="section-label">Saved for later</span>

        <h1>My Favorites</h1>

        <p>
          Your favorite recipes, all in one delicious place.
        </p>
      </section>

      <section className="section">
        {favorites.length === 0 ? (
          <div className="empty-state">
            <span>♡</span>

            <h3>No favorites yet</h3>

            <p>
              Tap the heart on a recipe to save it here.
            </p>
          </div>
        ) : (
          <div className="recipe-grid">
            {favorites.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                key={recipe.idMeal}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Favorites;