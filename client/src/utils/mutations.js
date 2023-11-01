import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;


export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookData!) {
    saveBook(bookData: $bookData) {
    user {
        _id
        email
    
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      user{
        _id
        email
     
      savedBooks {
        bookId
        authors
        title
        description
      }
      }
    }
  }
`;