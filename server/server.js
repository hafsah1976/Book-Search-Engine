// Import required modules and dependencies
require('dotenv').config({ path: '../.env' });//confidenttial variables
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const app = express();
const { gql } = require('graphql');
const {authMiddleware}= require('./utils/auth');

// Define the port on which the server should listen, using the provided PORT or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Enable parsing of URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const _dirname = path.dirname("");
// const buildPath = path.join(_dirname, "../client/build");
// app.use(express.static(buildPath));
// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
// }

// Serve the React frontend as static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//get all
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create an Apollo Server instance with your GraphQL schema and resolvers
const server = new ApolloServer({
  typeDefs, // GraphQL schema definition
  resolvers,// GraphQL resolvers
  context: authMiddleware,
  gql,
});


// Start the Apollo Server and apply it as middleware to the Express app
server.start().then(() => {
  server.applyMiddleware({ app });
});

db.once('open', () => {
  app.listen(PORT, async () => {
    console.log(`🌍 Now listening on localhost:${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
});