// Import required modules and dependencies
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas'); // Import GraphQL schema and resolvers
const app = express();
const { authMiddleware } = require('./utils/auth'); // Import authentication middleware

// Define the port on which the server should listen, using the provided PORT or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Create an Apollo Server instance with your GraphQL schema and resolvers
const server = new ApolloServer({
  typeDefs, // GraphQL schema definition
  resolvers, // GraphQL resolvers
  context: authMiddleware, // Apply authentication middleware to the server context
});

// Enable parsing of URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the React frontend as static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Define a route for the root URL ("/") and serve the React frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/'));
});

// Start the Apollo Server and apply it as middleware to the Express app
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  // Connect to the database and start the server once the database connection is open
  db.once('open', () => {
    app.listen(PORT, async () => {
      console.log(`🌍 Now listening on localhost:${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Start the Apollo Server with the provided schema and resolvers
startApolloServer(typeDefs, resolvers);
