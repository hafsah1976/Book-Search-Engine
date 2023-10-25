import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id        // User's ID
      username   // User's username
      email      // User's email
      bookCount  //number of books user has saved
      savedBooks {
        bookId     // Book's ID
        authors    // Book's authors (an array)
        description // Book's description
        title      // Book's title
        image      // Book's image
      }
    }
  }
`;