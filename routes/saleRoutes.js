const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add new sale
router.post('/', (req, res) => {
  const sale = req.body;
  db.query('INSERT INTO sales SET ?', sale, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...sale });
  });
});

// Get all sales with crop name
router.get('/', (req, res) => {
  const sql = `
    SELECT sales.*, crops.crop_name 
    FROM sales 
    JOIN crops ON sales.crop_id = crops.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
