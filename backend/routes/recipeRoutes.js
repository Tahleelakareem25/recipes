const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../seed/recipes.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Cannot read file' });
    res.json(JSON.parse(data));
  });
});

module.exports = router;