import React, { useState } from "react";
import axios from "axios";
import "./Recipe.css";

export default function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChoosing, setIsChoosing] = useState(false);
  const [chooseIndex, setChooseIndex] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const APP_ID = process.env.REACT_APP_APP_ID;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please enter a valid dish name.");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${input}&app_id=${APP_ID}&app_key=${API_KEY}`
      );
      setRecipes(response.data.hits);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Cannot fetch recipes. Please try again later.");
      setRecipes([]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleChoose = (index) => {
    setChooseIndex(index);
    setIsChoosing(true);
  };

  const handleBack = () => {
    setChooseIndex(null);
    setIsChoosing(false);
  };

  return (
    <div className="container">
      <h2>Recipe Finder App</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="recipe-search">Search for a recipe:</label>
        <input
          id="recipe-search"
          type="text"
          placeholder="Enter a dish name"
          value={input}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {isLoading && <div className="loader"></div>}
      {!isLoading && recipes.length === 0 && !error && <p>No recipes found. Please try a different search.</p>}

      <div className="recipe-card-container">
        {isChoosing ? (
          <article className="recipe-card-detail">
            <p>{recipes[chooseIndex].recipe.label}</p>
            <img
              src={recipes[chooseIndex].recipe.image}
              alt={recipes[chooseIndex].recipe.label}
            />
            <ul>
              {recipes[chooseIndex].recipe.ingredientLines.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <a
              href={recipes[chooseIndex].recipe.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full Recipe
            </a>
            <button onClick={handleBack} aria-label="Go back to recipe list">Back</button>
          </article>
        ) : (
          recipes.map((recipeData, i) => (
            <div className="recipe-card" key={i} onClick={() => handleChoose(i)}>
              <p>{recipeData.recipe.label}</p>
              {recipeData.recipe.image && (
                <img
                  src={recipeData.recipe.image}
                  alt={recipeData.recipe.label}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
