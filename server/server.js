// Import required modules and dependencies
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const db = require('./config/connection'); // database connection setup

const { authMiddleware } = require('./utils/auth'); // importing the middleware

const { typeDefs, resolvers } = require('./schemas'); // Import your GraphQL schema type definition and resolvers

// Create an Express.js application instance
const app = express();

// Define the port on which the server should listen, using the provided PORT or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Create an Apollo Server instance with your GraphQL schema and resolvers
const server = new ApolloServer({
  typeDefs, // GraphQL schema definition
  resolvers, // GraphQL resolvers
  context:authMiddleware ,
})

// Enable parsing of URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the React frontend as static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build'))
)}

// Define a route for the root URL ('/') using the Express app
app.get('/', (req, res) => {
  // Send the main HTML file as a response
  // This is often used for serving a frontend application in a single-page application (SPA) setup
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema.
// Applying Apollo Server to the Express app as middleware
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  // Open the database connection and start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`React server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
