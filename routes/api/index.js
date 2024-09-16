const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Mount user-related routes at /users
router.use('/users', userRoutes);

// Mount thought-related routes at /thoughts
router.use('/thoughts', thoughtRoutes);

module.exports = router;
