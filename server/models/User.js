const { Schema, model } = require('mongoose'); // Import the Schema and model from Mongoose
const bcrypt = require('bcrypt'); // Import the bcrypt library for password hashing

// Import the bookSchema from the 'Book.js' file
const bookSchema = require('./Book');

// Define the user schema
const userSchema = new Schema(
  {
    username: {
      type: String, // Field for the username
      required: true, // Username is required
      unique: true, // Username must be unique
    },
    email: {
      type: String, // Field for the email
      required: true, // Email is required
      unique: true, // Email must be unique
      match: [/.+@.+\..+/, 'Must use a valid email address'], // Email format validation
    },
    password: {
      type: String, // Field for the password
      required: true, // Password is required
    },
    // Define 'savedBooks' as an array of data that adheres to the 'bookSchema'
    savedBooks: [bookSchema],
  },
  // Set options for the schema
  {
    toJSON: {
      virtuals: true, // Enable virtual fields when converting to JSON
    },
  }
);

// Hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Create a custom method to compare and validate the password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create a virtual field 'bookCount' to count the number of saved books
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

// Create a model 'User' using the 'userSchema'
const User = model('User', userSchema);

// Export the 'User' model
module.exports = User;