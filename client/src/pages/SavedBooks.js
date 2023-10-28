import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {
  Container,
  Card,
  Button,
  Col,
  Row,
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // Use the useQuery hook to fetch the user's data based on the GET_ME query
  const { loading, data } = useQuery(GET_ME);
  // Extract the user data from the fetched data, or an empty object if not available
  const userData = data?.me || {};
  // Use the useMutation hook to define a function to remove a book from the user's savedBooks

  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  // Function to handle the deletion of a saved book
  const handleDeleteBook = async (bookId) => {
    // Check if the user is logged in and get the token, or return false
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      // Use the removeBook mutation to remove the book by its ID
      await removeBook({
        variables: { bookId },
      });

      if (error) {
        // Handle and log any errors that occur during the book deletion process
        console.error("Something went wrong while deleting the book. Please try again.", error);
      }

      // Upon success, remove the book's ID from local storage to keep it in sync with the server
      removeBookId(bookId);
    } catch (err) {
      // Handle and log any errors that occur during the book deletion process
      console.error("Something went wrong while deleting the book. Please try again.", err);
    }
  };

  // Check for loading status, and return a loading message if true
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid="true" className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        {/* Display the title with the number of saved books (if any) */}
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className={"btn-block btn-danger"}
                    // Call the handleDeleteBook function when the delete button is clicked
                    onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
