// Import the 'jsonwebtoken' library to handle JSON Web Tokens (JWT)
const { AuthenticationError } = require('apollo-server-express');
const jwt = require("jsonwebtoken");

// Set the secret key and expiration time for the JWT
const secret = 'mysecretsshhhhh'; // A secret key for signing and verifying the JWT
const expiration = '2h'; // Expiration time of the JWT (2 hours)

module.exports = {
  // Middleware function for authenticating routes
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || '';

    if (token) {
      token = token.split(' ').pop().trim(); // Remove 'Bearer ' from the token string if it exists
    }

    if (!token) {
      throw new AuthenticationError('You have no token!'); // Throw an authentication error if no token is provided
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration }); // Verify the token and extract user data
      req.user = data; // Attach user data to the request object
    } catch (err) {
      console.log('Invalid token'); // Handle invalid tokens (for debugging)
      throw new Error('Invalid token!'); // Throw an error for invalid tokens
    }

    return { req };
  },

  // Function for signing a new JWT with user data
  signToken: function ({ username, email, _id }) {
    // Create a payload object containing user data
    const payload = { username, email, _id };

    // Sign a JWT with the payload, secret key, and expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
