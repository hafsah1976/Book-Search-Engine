const { gql } = require("apollo-server-express"); // Importing the gql template literal function from the Apollo Server Express package.

// This is where I define my GraphQL schema using the gql template literal function.
// Each type definition corresponds to a part of the GraphQL schema, such as Query, Mutation, User, and Book.
// Within these types, I have defined the fields and their types.

const typeDefs = gql`

  type Query {
      me: User
  }

  type Book {
    bookId: String!
    authors: String
    description: String
    title: String!
    image: String
    link: String
  }

  input bookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Auth {
  token: ID!
  user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: bookInput): User
    removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs; // Export the typeDefs for use in your Apollo Server setup.
