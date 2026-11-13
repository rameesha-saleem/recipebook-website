import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import { searchMeals } from "../services/mealApi";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const search = async () => {
      if (!query) {
        setRecipes([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await searchMeals(query);
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query]);

  return (
    <div className="page">
      <section className="search-page-top">
        <span className="section-label">Find your meal</span>

        <h1>Search Results</h1>

        <SearchBar initialValue={query} />
      </section>

      <section className="section">
        {query && (
          <div className="results-info">
            Results for <strong>"{query}"</strong>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : recipes.length === 0 ? (
          <div className="empty-state">
            <span>🔎</span>
            <h3>No recipes found</h3>
            <p>Try searching for another recipe or ingredient.</p>
          </div>
        ) : (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
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

export default SearchResults;