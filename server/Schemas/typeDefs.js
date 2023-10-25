const { gql } = require("apollo-server-express"); // Importing the gql template literal function from the Apollo Server Express package.

// This is where I define my GraphQL schema using the gql template literal function.
// Each type definition corresponds to a part of the GraphQL schema, such as Query, Mutation, User, and Book.
// Within these types, I have defined the fields and their types.
// For the saveBook mutation, it expects an input type BookInput (with a capital 'B').

const typeDefs = gql`
  type Book {
    _id: ID
    authors: [String]!
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Query {
      me: User
  }
  type Auth {
  token: ID!
  user: User
  }
  input BookInput {
      authors: [String]
      description: String
      bookId: String
      image: String
      link: String
      title: String
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput): User
    removeBook(bookId: String!): User
}
`;

module.exports = typeDefs; // Export the typeDefs for use in your Apollo Server setup.
