import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recipes`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch recipes");
        return res.json();
      })
      .then(data => setRecipes(data))
      .catch(err => {
        console.error(err);
        setError("Could not load recipes. Please try again later.");
      });
  }, []);

  // Filter recipes based on search term
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="hero">
        <div className="overlay">
          <h1>Recipe Finder</h1>
          <p>Find the best recipes here!</p>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <h2 className="section-title">Popular Recipes</h2>

      {error && <p className="error">{error}</p>}

      <div className="grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <div className="recipe-card" key={recipe.id}>
              <img src={recipe.image} alt={recipe.name} />
              <div className="recipe-content">
                <h3>{recipe.name}</h3>
                <p>{recipe.instructions}</p>
                {recipe.ingredients && (
                  <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default App;