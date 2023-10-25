import React, { useState, useEffect } from 'react'; // Import React hooks and components from react-bootstrap
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import { useMutation} from '@apollo/client' //// Import useMutation hook for GraphQL mutations
import {SAVE_BOOK } from '../utils/mutations' // Import the SAVE_BOOK mutation
import Auth from '../utils/auth'; // Import the Auth utility for user authentication
import { saveBookIds, getSavedBookIds } from '../utils/localStorage'; // Import functions for working with local storage

const SearchBooks = () => {
  // Create a mutation function for saving books
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  // Create a state to store data returned from the Google API
  const [searchedBooks, setSearchedBooks] = useState([]);

  // Create a state to store the data entered in the search field
  const [searchInput, setSearchInput] = useState('');

  // Create a state to store the IDs of saved books
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  // Set up a useEffect hook to save the `savedBookIds` list to local storage when the component unmounts.
  // For more details, check out the official React documentation on useEffect with cleanup: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // Create a method to search for books and update the component state when the form is submitted.
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if the search input is empty and return early if so.
    if (!searchInput) {
      return false;
    }

    try {
      // Send a request to the Google Books API to search for books based on the search input.
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );

      // Check if the response is not okay (HTTP status code indicates an error).
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      // Parse the response JSON and extract the 'items' data.
      const { items } = await response.json();
      // Rest of your code...
    } catch (error) {
      // Handle errors in case of network issues or other problems.
      console.error('Error:', error);
    }
  }
  
// Map the fetched book data to a new format and set the component state.
const bookData = items.map((book) => ({
  bookId: book.id,
  authors: book.volumeInfo.authors || ['No author available'],
  title: book.volumeInfo.title,
  description: book.volumeInfo.description || '',
  image: book.volumeInfo.imageLinks?.thumbnail || '',
}));

// Update the state with the formatted book data.
setSearchedBooks(bookData);

// Clear the search input field after processing the search.
setSearchInput('');

} catch (error) {
  // Handle any errors that occurred during book data processing.
  console.error('Error:', error);
}
// Define a function to handle saving a book to our database
const handleSaveBook = async (bookId) => {
  // Find the book in the `searchedBooks` state that matches the given bookId
  const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

  // Get the user's authentication token
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    // If there is no authentication token, return early
    return false;
  }

  try {
    // Use the saveBook mutation to save the book to the user's account
    const { data } = await saveBook({
      variables: { book: bookToSave }
    });

    // If the book is successfully saved to the user's account, update the savedBookIds state
    setSavedBookIds([...savedBookIds, bookToSave.bookId]);
  } catch (error) {
    // Handle and log any errors that occur during the saving process
    console.error('Error:', error);
  }
};
