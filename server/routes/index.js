const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

// Include API routes by using the '/api' prefix
router.use('/api', apiRoutes);

// Serve the React front-end in production
router.use((req, res) => {
  // Send the React application's entry HTML file
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
