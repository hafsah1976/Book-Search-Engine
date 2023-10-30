// Import the 'jsonwebtoken' library to handle JSON Web Tokens (JWT)
const jwt = require("jsonwebtoken");

// Set the secret key and expiration time for the JWT
const mysecret = 'mysecretsshhhhh'; // A secret key for signing and verifying the JWT
const expiration ='2h'; // Expiration time of the JWT (2 hours)

module.exports = {
  // Middleware function for authenticating routes
  authMiddleware: function ({ req }) {
    let token = req.query.token || req.headers.authorization || req.body.token;

    if (token) {
      token = token.split(' ').pop().trim(); // Remove 'Bearer ' from the token string if it exists
    }

    if (!token) {
      return {req}; // Throw an authentication error if no token is provided
    }

    try {
      const { data } = jwt.verify(token, mysecret, { maxAge: expiration }); // Verify the token and extract user data
      req.user = data; // Attach user data to the request object
    } catch (err) {
      console.log('Invalid token'); // Handle invalid tokens (for debugging)
      return res.status(400).json({ message: 'invalid token!' });    
    }

    return  req;
  },

  // Function for signing a new JWT with user data
  signToken: function ({ username, email, _id }) {
    // Create a payload object containing user data
    const payload = { username, email, _id };

    // Sign a JWT with the payload, secret key, and expiration time
    return jwt.sign({ data: payload }, mysecret, { expiresIn: expiration });
  },
};