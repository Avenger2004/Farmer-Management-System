const express = require('express');
const router = express.Router();
const Farmer = require('../models/farmer');

// Add new farmer
router.post('/', (req, res) => {
  Farmer.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Get all farmers
router.get('/', (req, res) => {
  Farmer.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Delete farmer
router.delete('/:id', (req, res) => {
  Farmer.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// Update farmer
router.put('/:id', (req, res) => {
  Farmer.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

module.exports = router;
