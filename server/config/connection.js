// Import the dotenv library to load environment variables from a .env file
require('dotenv').config();

// Import the Mongoose library to interact with the MongoDB database
const mongoose = require('mongoose');

//Connect to the MongoDB database using the provided URI
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

// Export the Mongoose connection to be used in other parts of the application
module.exports = mongoose.connection;

