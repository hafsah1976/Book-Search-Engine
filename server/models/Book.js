const { Schema } = require('mongoose'); // Import the Schema object from Mongoose

// Define a subdocument schema for individual books within the `savedBooks` array of the User model in User.js
const bookSchema = new Schema({
  authors: [
    {
      type: String, // An array of author names (strings)
    },
  ],
  description: {
    type: String,
    required: true, // The description is required
  },
  bookId: {
    type: String,
    required: true, // The book ID from Google Books is required
  },
  image: {
    type: String, // URL for the book's image
  },
  link: {
    type: String, // URL for the book's external link
  },
  title: {
    type: String,
    required: true, // The title of the book is required
  },
});

module.exports = bookSchema; // Export the 'bookSchema'