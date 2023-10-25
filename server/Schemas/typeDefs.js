const { gql } = require("apollo-server-express"); // Importing the gql template literal function from the Apollo Server Express package.

// This is where I define my GraphQL schema using the gql template literal function.
  // Each type definition corresponds to a part of the GraphQL schema, such as Query, Mutation, User, and Book.
  // Within these types, I have defined the fields and their types.
  // For the saveBook mutation, it expects an input type BookInput (with a capital 'B').

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: String!
    authors: [String!]!
    description: String
    title: String!
    image: String
  }
  type Auth {
    token: ID!
    user: User
  }

  input Criteria {
    bookId: String!
    authors: [String!]!
    description: String
    title: String!
    image: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: Criteria): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs; // Export the typeDefs for use in your Apollo Server setup.