//to handle authentication-related errors and provide meaningful error messages in GraphQL queries/mutations when authentication fails.
const { AuthenticationError } = require("apollo-server-express");

// for user data, allowing you to query and interact with the user data stored in your database.
const { User } = require("../models");

//function that signs JSON Web Tokens (JWTs), which are used for user authentication and authorization in your GraphQL server.
const { signToken } = require("../utils/auth");

