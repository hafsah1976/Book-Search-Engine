import React from 'react';

// Removed unused import statement
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK} from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {

  const { loading, data } = useQuery(GET_ME);   // Use the `useQuery` hook to execute the GET_ME query and store the result in userData

  const userData = data?.me || {};

  // Initialize a mutation function and error object using the REMOVE_BOOK mutation
  const [removeBook, {error} ] = useMutation(REMOVE_BOOK);

  // Define a function that handles book deletion
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await removeBook({
        variables: { bookId }
      });

      // Log the mutation response
      console.log(data);

      // Update userData by removing the book
      userData.me.savedBooks = userData.me.savedBooks.filter((book) => book.bookId !== bookId);

      // Remove the book ID from local storage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // Check for loading status, and return a loading message if true
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <Container>
      {/* Display the title with the number of saved books (if any) */}
      <h2 className='pt-5'>
        {userData.me.savedBooks.length
          ? `Viewing ${userData.me.savedBooks.length} saved ${userData.me.savedBooks.length === 1 ? 'book' : 'books'}:`
          : 'You have no saved books!'}
      </h2>
      <Row>
        {userData.me.savedBooks.map((book) => (
          // Create a card for each saved book
          <Col md="4" key={book.bookId}>
            <Card border='dark'>
              {book.image && <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />}
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <p className='small'>Authors: {book.authors}</p>
                <Card.Text>{book.description}</Card.Text>
                {/* Add a button to delete the book */}
                <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                  Delete this Book!
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SavedBooks;
