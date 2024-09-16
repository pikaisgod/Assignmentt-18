const router = require('express').Router();
const apiRoutes = require('./api');  // Import API routes

// Use the API routes at the /api path
router.use('/api', apiRoutes);

module.exports = router;
