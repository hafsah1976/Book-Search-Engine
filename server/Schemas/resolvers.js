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

    Mutation: {
        // Create a new user in the database
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user); // Sign a JWT token for the new user
          return { token, user }; // Return the token and user data
        },

        //the user login process
    login: async (parent, { email, password }) => {
        // Find the user by their email
        const user = await User.findOne({ email });
        
        // If the user is not found, throw an AuthenticationError
        if (!user) {
          throw new AuthenticationError("No User found with this email. Please create an account to continue.");
        }
    
        // Check if the provided password is correct
        const correctPw = await user.isCorrectPassword(password);
        
        // If the password is incorrect, throw an AuthenticationError
        if (!correctPw) {
          throw new AuthenticationError("Your email or password is incorrect!");
        }
    
        // Sign a JWT token for the authenticated user
        const token = signToken(user);
    
        // Return the JWT token and user data
        return { token, user };
    },