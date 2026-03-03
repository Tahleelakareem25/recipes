const Recipe = require('../models/Recipe');

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addRecipe = async (req, res) => {
  const { title, description, image, ingredients, steps } = req.body;
  const recipe = new Recipe({ title, description, image, ingredients, steps });
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getRecipes, addRecipe };