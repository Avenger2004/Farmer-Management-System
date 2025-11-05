const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cropRoutes = require('./routes/cropRoutes');
const farmerRoutes = require('./routes/farmerRoutes'); // <-- Add this line

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/crops', cropRoutes);
app.use('/farmers', farmerRoutes); // <-- Add this line

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});