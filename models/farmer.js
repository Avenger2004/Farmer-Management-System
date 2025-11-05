const db = require('../config/db');

const Farmer = {
  getAll: (callback) => {
    db.query('SELECT * FROM farmers', callback);
  },
  create: (data, callback) => {
    db.query('INSERT INTO farmers SET ?', data, callback);
  },
  update: (id, data, callback) => {
    // Only update fields that are provided and not undefined
    const fields = {};
    if (typeof data.name !== 'undefined') fields.name = data.name;
    if (typeof data.age !== 'undefined') fields.age = data.age;
    if (typeof data.location !== 'undefined') fields.location = data.location;
    if (typeof data.phone !== 'undefined') fields.phone = data.phone;
    db.query('UPDATE farmers SET ? WHERE id = ?', [fields, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM farmers WHERE id = ?', [id], callback);
  }
};

module.exports = Farmer;
