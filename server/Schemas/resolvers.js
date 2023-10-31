const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // Check if the user is authenticated (context.user will be set if authenticated)
      if (context.user) {
        try {
          //find user by id
          const user = await User.findOne({_id: context.user._id})
          .select('-__v -password');
          return user;
        } catch (error) {
          // If there's an error during data retrieval, throw an AuthenticationError
          throw new AuthenticationError("You must be logged in to continue.");
        }
      }
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        // Create a new user in the database
        const user = await User.create(args);
        const token = signToken(user); // Sign a JWT token for the new user
        return { token, user }; // Return the token and user data
      } catch (error) {
        throw new AuthenticationError("Failed to create user"); //throw error is sign up fails
      }
    },

    login: async (parent, { email, password }) => {
      try {
        // Find the user by their email
        const user = await User.findOne({ email });

        if (!user) {
          // If the user is not found, throw an AuthenticationError
          throw new AuthenticationError(
            "No user found with this email. Please create an account to continue."
          );
        }

        // Check if the provided password is correct
        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          // If the password is incorrect, throw an AuthenticationError
          throw new AuthenticationError("Incorrect email or password!");
        }

        const token = signToken(user); // Sign a JWT token for the authenticated user
        return { token, user }; // Return the JWT token and user data
      } catch (error) {
        throw new AuthenticationError("Failed to login" + error.message); // throw error if login fails
      }
    },

    saveBook: async (parent, { bookData }, context) => {
      try {
        // Check if the user is authenticated (logged in)
        if (context.user) {
          // If the user is authenticated, update their document to add the book to savedBooks
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id }, // Find the user by their unique ID
            { $addToSet: { savedBooks: bookData } }, // Add the book to the savedBooks array (no duplicates)
            { new: true, runValidators:true } // Return the updated user with validation checks
          ); // Populate the 'savedBooks' field for a full response, including book details
          return updatedUser; // Return the updated user with the saved book
        } 
        //   // If the user is not authenticated, throw an authentication error
        //   throw new AuthenticationError("You must be logged in to save books");
        // }
      } catch (error) {
        // If an error occurs during the process, throw a custom error message
    throw new AuthenticationError("You must be logged in to save books");

      }
    },
            
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        try {
          // Remove a book from the user's savedBooks array by bookId
          const updatedUser = await User.findByOneAndUpdate(
            {_id: context.user._id},
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true} 
          )
          return updatedUser;
        } catch (error) {
          // Handle errors when removing the book
          throw new AuthenticationError("Login required to delete a book!");
        }
      }
  }
}
};

module.exports = resolvers;