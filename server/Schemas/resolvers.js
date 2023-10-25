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
          const userData = await User.findOne({ _id: context.user._id });
      
        // If not authenticated, throw an AuthenticationError
        throw new AuthenticationError("You must be logged in!")
      }
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

       //**Mutation for saving a book to user's savedbook field**

    //first check if the user is authenticated by verifying the presence of context.user. 
    //If the user is authenticated, it uses User.findByIdAndUpdate to update the user's document in the database by pushing the new book to the savedBooks array and returns the updated user data. 
    //If the user is not authenticated, it throws an AuthenticationError to indicate that the user needs to be logged in to save a book.
    saveBook: async (parent, { bookData }, context) => {
        // Check if the user is authenticated (context.user will be set if authenticated)
        if (context.user) { 
            // Use Mongoose's `findOneAndUpdate` to add the new book to the user's savedBooks array
          const updatedUser = await User.findOneAndUpdate(
            {_id: context.user._id},
            { $addToSet: { savedBooks: bookData } },
            { new: true, runValidators:true } // Return the updated user data
          );
          return updatedUser;
        }
        // If not authenticated, throw an AuthenticationError
        throw new AuthenticationError("You need to be logged in to Save a book!");
    },

     //**Mutation for removing a book from user's savedbooks field**

    //The code checks if the user is authenticated by verifying the presence of context.user.
    //If the user is authenticated, it uses User.findByIdAndUpdate to update the user's document in the database by pulling (removing) the book with the given bookId from the savedBooks array and returns the updated user data.
    //If the user is not authenticated, it throws an AuthenticationError to indicate that login is required to remove a book.
    removeBook: async (parent, { bookId }, context) => {
        // Check if the user is authenticated (context.user will be set if authenticated)
        if (context.user) {
          // Use Mongoose's `findByIdAndUpdate` to remove the book with the given bookId from the user's savedBooks array
          const updatedUser = await User.findByIdAndUpdate(
            {_id: context.user._id},
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true } // Return the updated user data
          );
          return updatedUser;
        }
        // If not authenticated, throw an AuthenticationError to delete a book
        throw new AuthenticationError("Login required to delete book!");
    },
    
}
};
module.exports = resolvers;