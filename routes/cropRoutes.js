const express = require('express');
const router = express.Router();
const Crop = require('../models/crop');

// Add new crop
router.post('/', (req, res) => {
  Crop.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

// Get all crops with farmer name
router.get('/', (req, res) => {
  Crop.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
