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