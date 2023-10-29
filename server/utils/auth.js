// Import the 'jsonwebtoken' library to handle JSON Web Tokens (JWT)
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Set the secret key and expiration time for the JWT
const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRATION_TIME = process.env.EXPIRATION_TIME;

module.exports = {
  // Middleware function for authenticating routes
  authMiddleware: function ({ req }) {
    // Allow the token to be sent via request query parameters, request body, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If the token is included in the 'Authorization' header, extract it
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim(); // Remove 'Bearer ' from the token string
    }

    // If there's no token, return the original request object
    if (!token) {
      return req;
    }

    // Verify the token and extract user data from it
    try {
      const { data } = jwt.verify(token, SECRET_KEY, { maxAge: EXPIRATION_TIME });
      req.user = data; // Attach user data to the request object
    } catch {
      console.log("Invalid token"); // Handle invalid tokens (for debugging)
      //return res.status(400).json({ message: 'invalid token!' });
    }

    // Return the updated request object (with or without user data)
    return req;
  },

  // Function for signing a new JWT with user data
  signToken: function ({ username, email, _id }) {
    // Create a payload object containing user data
    const payload = { username, email, _id };

    // Sign a JWT with the payload, secret key, and expiration time
    return jwt.sign({ data: payload }, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
  },
};

