// Import the dotenv library to load environment variables from a .env file
//require('dotenv').config();

// Import the Mongoose library to interact with the MongoDB database
const mongoose = require('mongoose');


// Connect to the MongoDB database using the provided URI
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks-app', {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Export the Mongoose connection to be used in other parts of the application
module.exports = mongoose.connection;
