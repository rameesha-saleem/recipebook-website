const CategoryFilter = ({
  categories = [],
  activeCategory,
  onChange,
}) => {
  return (
    <div className="category-filter">
      <button
        className={activeCategory === "All" ? "active" : ""}
        onClick={() => onChange("All")}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={
            activeCategory === category ? "active" : ""
          }
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;