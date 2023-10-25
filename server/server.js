// Import required modules and dependencies
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const db = require('./config/connection'); // database connection setup

const {authMiddleware} = require('./utils/auth'); // importing the middleware 

const { typeDefs, resolvers } = require('./schemas'); // Import your GraphQL schema type definition and resolvers

// Create an Express.js application instance
const app = express();

// Define the port on which the server should listen, using the provided PORT or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Create an Apollo Server instance with your GraphQL schema and resolvers
const server = new ApolloServer({
  typeDefs, //  GraphQL schema definition
  resolvers, //  GraphQL resolvers
  context:authMiddleware,
});

// Enable parsing of URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
