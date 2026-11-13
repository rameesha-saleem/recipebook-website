import {
  useRef,
  useState,
} from "react";

import {
  ImagePlus,
  Save,
  X,
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useRecipe,
} from "../context/RecipeContext";

const AddRecipe = () => {
  const navigate = useNavigate();

  const { addMyRecipe } =
    useRecipe();

  const fileInputRef =
    useRef(null);

  const [form, setForm] =
    useState({
      name: "",
      category: "",
      area: "",
      ingredients: "",
      instructions: "",
      image: "",
    });

  const [preview, setPreview] =
    useState("");

  const [error, setError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleImage = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select an image file."
      );
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      const image =
        reader.result;

      setPreview(image);

      setForm((current) => ({
        ...current,
        image,
      }));
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview("");

    setForm((current) => ({
      ...current,
      image: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.ingredients.trim() ||
      !form.instructions.trim()
    ) {
      setError(
        "Please fill in all required fields."
      );
      return;
    }

    try {
      setSaving(true);

      const ingredientList =
        form.ingredients
          .split("\n")
          .map((item) =>
            item.trim()
          )
          .filter(Boolean);

      const recipe = {
        idMeal: `local-${Date.now()}`,

        strMeal:
          form.name.trim(),

        strCategory:
          form.category.trim(),

        strArea:
          form.area.trim() ||
          "Homemade",

        strMealThumb:
          form.image ||
          "/images/placeholder.jpg",

        strInstructions:
          form.instructions.trim(),

        ingredientsText:
          ingredientList.join("\n"),

        isLocal: true,
      };

      addMyRecipe(recipe);

      navigate("/my-recipes");
    } catch (err) {
      setError(
        "Unable to save recipe."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page add-recipe-page">

      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={17} />
        Back
      </button>

      <section className="add-recipe-header">

        <span className="page-label">
          YOUR KITCHEN
        </span>

        <h1>
          Create Your Recipe
        </h1>

        <p>
          Add your favorite recipe and
          keep it in your personal kitchen.
        </p>

      </section>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form
        className="add-recipe-form"
        onSubmit={handleSubmit}
      >

        {/* IMAGE */}
        <div className="image-upload-section">

          <div className="form-section-title">
            <h2>Recipe Image</h2>

            <p>
              Add a beautiful photo of
              your recipe.
            </p>
          </div>

          <div
            className={`image-upload ${
              preview
                ? "has-image"
                : ""
            }`}
            onClick={() =>
              !preview &&
              fileInputRef.current?.click()
            }
          >

            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Recipe preview"
                />

                <button
                  type="button"
                  className="remove-image"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <>

                <div className="upload-icon">
                  <ImagePlus
                    size={28}
                  />
                </div>

                <strong>
                  Upload Recipe Image
                </strong>

                <span>
                  JPG, PNG or WEBP
                </span>

              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              hidden
            />

          </div>

          {!preview && (
            <button
              type="button"
              className="upload-button"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              <ImagePlus size={16} />
              Choose Image
            </button>
          )}

        </div>

        {/* BASIC INFORMATION */}
        <div className="form-section">

          <div className="form-section-title">
            <h2>
              Recipe Information
            </h2>

            <p>
              Tell us about your delicious
              creation.
            </p>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>
                Recipe Name <span>*</span>
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Creamy Chicken Pasta"
              />
            </div>

            <div className="form-group">
              <label>
                Category <span>*</span>
              </label>

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Pasta"
              />
            </div>

            <div className="form-group">
              <label>
                Cuisine / Area
              </label>

              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="e.g. Italian"
              />
            </div>

          </div>

        </div>

        {/* INGREDIENTS */}
        <div className="form-section">

          <div className="form-section-title">
            <h2>
              Ingredients
            </h2>

            <p>
              Write one ingredient on
              each line.
            </p>
          </div>

          <div className="form-group">

            <textarea
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              rows="8"
              placeholder={`2 cups pasta
1 cup chicken
1/2 cup cream
1 tsp salt`}
            />

          </div>

        </div>

        {/* INSTRUCTIONS */}
        <div className="form-section">

          <div className="form-section-title">
            <h2>
              Instructions
            </h2>

            <p>
              Explain how to prepare
              your recipe.
            </p>
          </div>

          <div className="form-group">

            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              rows="10"
              placeholder="Write your cooking instructions here..."
            />

          </div>

        </div>

        {/* BUTTONS */}
        <div className="form-actions">

          <button
            type="button"
            className="secondary-btn"
            onClick={() =>
              navigate("/my-recipes")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-btn"
            disabled={saving}
          >
            <Save size={17} />

            {saving
              ? "Saving..."
              : "Save Recipe"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddRecipe;