const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError("You must be logged in!");
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email. Please create an account to continue.");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect email or password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { input }, { user }) => {
      if (user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in to save a book!");
    },

    removeBook: async (parent, { bookId }, { user }) => {
      if (user) {
        try{ 
          const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          ).populate("savedBooks");
          return updatedUser;
        } catch (error) {
          throw new AuthenticationError("Failed to remove book");
        }
      }
      throw new AuthenticationError("Login required to delete a book!");
    },
  }
  };

module.exports = resolvers;