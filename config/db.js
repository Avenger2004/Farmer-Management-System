const mysql = require('mysql2');
require('dotenv').config();

// Create connection using DATABASE_URL from .env
const connection = mysql.createConnection({
  uri: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  }
});

// Create database if it doesn't exist
connection.query('CREATE DATABASE IF NOT EXISTS farmerDB', (err) => {
  if (err) throw err;
  console.log('✅ Database farmerDB is ready');

  // Now connect to the new database
  connection.changeUser({ database: 'farmerDB' }, (err) => {
    if (err) throw err;
    console.log('✅ MySQL connected to farmerDB');

    // Create farmers table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS farmers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT,
        location VARCHAR(100),
        phone VARCHAR(20)
      )
    `;
    connection.query(createTableQuery, (err) => {
      if (err) throw err;
      console.log('✅ Table farmers is ready');
    });
  });
});

module.exports = connection;