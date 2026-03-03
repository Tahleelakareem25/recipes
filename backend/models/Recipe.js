const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  ingredients: [String],
  steps: [String],
});

module.exports = mongoose.model('Recipe', recipeSchema);