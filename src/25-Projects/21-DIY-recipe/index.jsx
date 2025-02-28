import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";

const RECIPES = [
  {
    id: uuidv4(),
    name: "Chicken Fried Rice",
    ingredients: ["chicken", "rice", "soy sauce", "eggs", "vegetables"],
    instructions:
      "Stir-fry chicken, add rice, veggies, and season with soy sauce. Mix in scrambled eggs.",
    tags: ["Quick", "Savory"],
  },
  {
    id: uuidv4(),
    name: "Vegetable Stir-Fry",
    ingredients: ["vegetables", "soy sauce", "garlic", "oil"],
    instructions:
      "Stir-fry vegetables in oil with garlic. Add soy sauce for seasoning.",
    tags: ["Healthy", "Quick"],
  },
  {
    id: uuidv4(),
    name: "Chicken Wrap",
    ingredients: ["chicken", "tortilla", "lettuce", "mayo"],
    instructions:
      "Grill chicken, spread mayo on tortilla, add lettuce and sliced chicken.",
    tags: ["Easy", "Portable"],
  },
];

function DIYRecipe() {
  const [savedRecipes, setSavedRecipes] = useState(() => {
    const localData = localStorage.getItem("savedRecipes");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6 md:p-10">
            <nav className="mb-10 flex justify-between items-center max-w-4xl mx-auto">
              <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
                Recipe Remix
              </h1>
              <Link
                to="/diy-recipe/saved"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                <BookmarkIcon className="h-6 w-6" />
                <span className="font-medium">
                  Saved ({savedRecipes.length})
                </span>
              </Link>
            </nav>
            <IngredientInput
              savedRecipes={savedRecipes}
              setSavedRecipes={setSavedRecipes}
            />
          </div>
        }
      />

      <Route
        path="/saved"
        element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6 md:p-10">
            <nav className="mb-10 flex justify-between items-center max-w-4xl mx-auto">
              <Link
                to="/diy-recipe"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium transition-colors duration-200"
              >
                ← Back to Remixer
              </Link>
              <h2 className="text-3xl font-extrabold text-gray-800">
                Saved Recipes
              </h2>
              <div></div>
            </nav>
            <SavedRecipes
              savedRecipes={savedRecipes}
              setSavedRecipes={setSavedRecipes}
            />
          </div>
        }
      />

      <Route
        path="*"
        element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6 md:p-10">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              404 - Page Not Found
            </h2>
            <Link
              to="/diy-recipe"
              className="block text-center text-blue-600 hover:underline mt-4"
            >
              Back to Home
            </Link>
          </div>
        }
      />
    </Routes>
  );
}

function IngredientInput({ savedRecipes, setSavedRecipes }) {
  const [input, setInput] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please enter some ingredients!");
      return;
    }
    const ingredients = input
      .toLowerCase()
      .split(",")
      .map((item) => item.trim());
    const found = RECIPES.filter((recipe) =>
      ingredients.some((ingredient) => recipe.ingredients.includes(ingredient))
    );
    setMatches(found);
    setError(
      found.length === 0 ? "No recipes found. Try different ingredients!" : ""
    );
  };

  const toggleSave = (recipe) => {
    setSavedRecipes((prev) =>
      prev.some((r) => r.id === recipe.id)
        ? prev.filter((r) => r.id !== recipe.id)
        : [...prev, recipe]
    );
  };

  const clearInput = () => {
    setInput("");
    setMatches([]);
    setError("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter ingredients (e.g., chicken, rice)..."
            className="w-full p-4 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          />
          {input && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          Remix Recipes!
        </button>
      </form>

      {error && (
        <p className="text-center text-red-500 font-medium mb-6 animate-fade-in">
          {error}
        </p>
      )}

      <div className="space-y-6">
        {matches.length === 0 && !error ? (
          <p className="text-center text-gray-500 italic">
            Enter ingredients to find tasty recipes!
          </p>
        ) : (
          matches.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {recipe.name}
                  </h3>
                  <div className="flex gap-2 mt-1">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => toggleSave(recipe)}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                >
                  {savedRecipes.some((r) => r.id === recipe.id) ? (
                    <BookmarkSolidIcon className="h-6 w-6" />
                  ) : (
                    <BookmarkIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
              <p className="text-gray-600 mt-3">
                <span className="font-medium">Ingredients:</span>{" "}
                {recipe.ingredients.join(", ")}
              </p>
              <p className="text-gray-700 mt-2">{recipe.instructions}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SavedRecipes({ savedRecipes, setSavedRecipes }) {
  const removeRecipe = (id) => {
    setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {savedRecipes.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No saved recipes yet. Start remixing!
        </p>
      ) : (
        savedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {recipe.name}
                </h3>
                <div className="flex gap-2 mt-1">
                  {recipe.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => removeRecipe(recipe.id)}
                className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
              >
                <BookmarkSlashIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-600 mt-3">
              <span className="font-medium">Ingredients:</span>{" "}
              {recipe.ingredients.join(", ")}
            </p>
            <p className="text-gray-700 mt-2">{recipe.instructions}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DIYRecipe;
