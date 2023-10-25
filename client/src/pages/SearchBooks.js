import { useMutation } from '@apollo/client'; // Import useMutation hook for GraphQL mutations
import { SAVE_BOOK } from '../utils/mutations'; // Import the SAVE_BOOK mutation
import Auth from '../utils/auth'; // Import the Auth utility for user authentication
import { searchGoogleBooks } from '../utils/API'; // Import the searchGoogleBooks function for book search
import { saveBookIds, getSavedBookIds } from '../utils/localStorage'; // Import functions for working with local storage

import { useState, useEffect } from 'react'; // Import React hooks and components from react-bootstrap
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

const SearchBooks = () => {
  // Create state for holding returned Google API data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // Create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // Create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // Define the useMutation hook for saving a book
  const [saveBook] = useMutation(SAVE_BOOK);

  // Use the effect to save `savedBookIds` list to localStorage when it changes
  useEffect(() => {
    saveBookIds(savedBookIds);
  }, [savedBookIds]);

  // Create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { items } = await response.json();

      // Process the API response data into a format suitable for rendering
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      // Set the state with the processed book data and reset the search input
      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // Create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // Find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // Get the user's token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Perform the saveBook mutation and extract the saved book ID
      const { data } = await saveBook({
        variables: { bookData: bookToSave },
      });

      const savedBookId = data.saveBook._id;

      // Update the state with the saved book ID
      setSavedBookIds([...savedBookIds, savedBookId]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds.includes(book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}
                      >
                        {savedBookIds.includes(book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
