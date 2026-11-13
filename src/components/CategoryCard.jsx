import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/recipes?category=${encodeURIComponent(
        category.strCategory
      )}`}
      className="category-card"
    >

      <div className="category-image">

        <img
          src={category.strCategoryThumb}
          alt={category.strCategory}
        />

      </div>

      <div className="category-card-content">

        <h3>
          {category.strCategory}
        </h3>

        <p>
          Explore recipes
        </p>

      </div>

    </Link>
  );
};

export default CategoryCard;