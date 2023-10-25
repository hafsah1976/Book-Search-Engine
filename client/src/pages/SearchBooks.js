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
};
