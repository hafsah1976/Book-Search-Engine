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
  };
