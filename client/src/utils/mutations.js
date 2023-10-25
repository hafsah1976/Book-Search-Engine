import { gql } from '@apollo/client';

// Define the LOGIN_USER mutation using gql template literal
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    // Define the login mutation that takes email and password as variables
    login(email: $email, password: $password) {
      // Request the token and user data from the response
      token
      user {
        // Specify the fields of user data to retrieve
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;

//This mutation is intended to create a new user. It expects the following variables: username, email, and password. 
//When executed, it returns a token and the user's ID, username, and email.
// tip to DEBUG: verify that the server-side mutation (addUser) and corresponding resolver are correctly defined and that front-end code properly uses this mutation to create a new user.

export const ADD_USER = gql `
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token     // The mutation should return a token
        user {     // The mutation should also return user data
          _id      // The user's ID
          username // The user's username
          email    // The user's email
          bookCount
            savedBooks {
              bookId
              authors
              description
              title
              image
              link
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql `
  mutation saveBook($newBook: BookInput!) {
    saveBook(newBook: $newBook) {   // Execute the saveBook mutation with a new book input
      _id          // Return the user's ID
      username     // Return the user's username
      email        // Return the user's email
      bookCount   // User's bookCount, the number of saved books they have, should increase as user adds books
      savedBooks { // Return an array of saved books
        bookId    // Book's ID
        authors   // Book's authors
        description // Book's description
        title     // Book's title
        image     // Book's image
        link      // Book's link
      }
    }
  } 
  `;

  export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id       // User's ID
      username  // User's username
      email     // User's email
      bookCount // User's bookCount, the number of saved books they have should reduce as the user deletes books
      savedBooks {
        bookId      // ID of the saved book
        authors     // Authors of the book
        description // Description of the book
        title       // Title of the book
        image       // Image URL of the book
        link        // Link URL of the book
      }
    }
  }
`;