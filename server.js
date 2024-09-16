const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');  // Ensure the routes are correctly imported

const PORT = process.env.PORT || 3001;
const app = express();

// Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

// Use routes
app.use(routes);  // Ensure routes are registered

// Start the server after database connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
