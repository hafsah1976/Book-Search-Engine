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
  const { data } = jwt.verify(token, secret, { maxAge: expiration });
  req.user = data; // Attach user data to the request object
} catch {
  console.log("Invalid token"); // Handle invalid tokens (for debugging)
  //return res.status(400).json({ message: 'invalid token!' });
}

// Return the updated request object (with or without user data)
return req;
},

  //   // send to next endpoint
  //   next();
  // },

 // Function for signing a new JWT with user data
 signToken: function ({ username, email, _id }) {
  // Create a payload object containing user data
  const payload = { username, email, _id };

  // Sign a JWT with the payload, secret key, and expiration time
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
},
};