import {
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

const SearchBar = ({
  large = false,
  initialValue = "",
}) => {
  const [query, setQuery] =
    useState(initialValue);

  const navigate =
    useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const value =
      query.trim();

    if (!value) return;

    navigate(
      `/search?q=${encodeURIComponent(
        value
      )}`
    );
  };

  return (
    <form
      className={`search-bar ${
        large
          ? "search-bar-large"
          : ""
      }`}
      onSubmit={handleSubmit}
    >

      <Search size={18} />

      <input
        type="text"
        placeholder="Search recipes, ingredients, or cuisines..."
        value={query}
        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }
      />

      <button
        type="submit"
        aria-label="Search"
      >
        <Search size={17} />
      </button>

    </form>
  );
};

export default SearchBar;