const router = require('express').Router();

// Import controller methods for handling user-related requests
const {
  createUser,      // Register a new user
  getSingleUser,   // Get information about a single user
  saveBook,        // Save a book to a user's profile
  deleteBook,      // Delete a saved book from a user's profile
  login,           // Log in an existing user
} = require('../../controllers/user-controller');

// Import authentication middleware for protecting specific routes
const { authMiddleware } = require('../../utils/auth');

// Define the routes and associate them with the appropriate controller methods
router.route('/').post(createUser).put(authMiddleware, saveBook);
// - POST: Create a new user
// - PUT: Save a book to the user's profile (protected by authMiddleware)

router.route('/login').post(authMiddleware, login);
// - POST: Log in an existing user

router.route('/me').get(authMiddleware, getSingleUser);
// - GET: Retrieve information about the currently authenticated user (protected by authMiddleware)

router.route('/books/:bookId').delete(authMiddleware, deleteBook);
// - DELETE: Remove a saved book from a user's profile (protected by authMiddleware)

module.exports = router;
