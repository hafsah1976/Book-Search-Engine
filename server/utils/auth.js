// Import the 'jsonwebtoken' library to handle JSON Web Tokens (JWT)
const jwt = require("jsonwebtoken");

// Set the secret key and expiration time for the JWT
const secret = "mysecretsshhhhh"; // A secret key for signing and verifying the JWT
const expiration = "2h"; // Expiration time of the JWT (2 hours)

// Export an object with two methods: 'authMiddleware' and 'signToken'
module.exports = {
  // Middleware function for authenticating routes
  authMiddleware: function ({ req }) {
    // Allow the token to be sent via request query parameters, request body, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;


    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
