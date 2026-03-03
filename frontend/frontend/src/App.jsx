import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://recipes-cpfl.onrender.com") // Backend API URL
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  return (
    <div>
      <div className="hero">
        <div className="overlay">
          <h1>Recipe Finder</h1>
          <p>Find the best recipes here!</p>
        </div>
      </div>

      <h2 className="section-title">Popular Recipes</h2>
      <div className="grid">
        {recipes.map(recipe => (
          <div className="recipe-card" key={recipe._id}>
            <img src={recipe.image} alt={recipe.title} />
            <div className="recipe-content">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;