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