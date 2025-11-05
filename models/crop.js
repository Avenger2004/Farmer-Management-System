const db = require('../config/db');

const Crop = {
  getAll: (callback) => {
    const sql = `SELECT crops.*, farmers.name AS farmer_name 
                 FROM crops 
                 JOIN farmers ON crops.farmer_id = farmers.id`;
    db.query(sql, callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO crops SET ?', data, callback);
  }
};

module.exports = Crop;
