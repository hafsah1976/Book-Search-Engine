import { gql } from '@apollo/client';

// Define the LOGIN_USER mutation using gql template literal
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    
    login(email: $email, password: $password) {
    
      token
      user {
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
        token     
        user {    
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

export const SAVE_BOOK = gql `
  mutation saveBook($newBook: BookInput!) {
    saveBook(newBook: $newBook) {  
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
  `;

  export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
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
`;