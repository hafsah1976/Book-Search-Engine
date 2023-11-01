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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/build");
app.use(express.static(buildPath));
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// app.use(routes);

//get all
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});// app.use(routes);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({app});

  db.once('open', () => {
    app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`graphql playground url: http://localhost:${PORT}${server.graphqlPath}`);
  })
  });
};

startApolloServer();