// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

dotenv.config();
connectDB(); // Optional DB connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve recipes from JSON
app.get('/api/recipes', (req, res) => {
  const filePath = path.join(__dirname, 'seed', 'recipes.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading recipes.json:', err);
      return res.status(500).json({ error: 'Cannot read recipes file' });
    }

    try {
      const recipes = JSON.parse(data);
      res.json(recipes); // ✅ Always returns valid JSON
    } catch (parseErr) {
      console.error('Error parsing recipes.json:', parseErr);
      res.status(500).json({ error: 'Invalid JSON in recipes file' });
    }
  });
});

// Health check route (optional)
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' }); // ✅ Return JSON, not text
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));