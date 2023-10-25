//to handle authentication-related errors and provide meaningful error messages in GraphQL queries/mutations when authentication fails.
const { AuthenticationError } = require("apollo-server-express");

// for user data, allowing you to query and interact with the user data stored in your database.
const { User } = require("../models");

//function that signs JSON Web Tokens (JWTs), which are used for user authentication and authorization in your GraphQL server.
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        // Check if the user is authenticated (context.user will be set if authenticated)
        if (context.user) {
          // Retrieve user data from the database, excluding sensitive fields
          const userData = await User.findOne({ _id: context.user._id }).select(
            "-__v -password"
          );
          return userData; // Return user data
        }
        // If not authenticated, throw an AuthenticationError
        throw new AuthenticationError("You must be logged in!");
      },
    },