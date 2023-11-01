import React from 'react';
import { Container, Card, Button, Col, Row } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // Use the useQuery hook to fetch user data based on the GET_ME query
  const { loading, data } = useQuery(GET_ME, { errorPolicy: "ignore" });
  const userData = data?.me || {};
  const [deleteBook, { error }] = useMutation(DELETE_BOOK);

  // Function to handle deleting a book
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Use the removeBook mutation to delete the book
      await deleteBook({
        variables: {
           bookId 
          },
      });

      if (error) {
        throw new Error('Something went wrong! ' + error.message);
      }

      // Remove the book from local storage
      removeBookId(bookId);
    } catch (error) {
      console.error("Something went wrong while deleting the book. Please try again.", error);
    }
  };

  // Conditional rendering of component
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container >
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:` // Added closing bracket here
            : 'You have no saved books!'}
            </h2>
            <Row >
          {userData.savedBooks.map((book) => {
            return (
              <Col md='4'>
              <Card  key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body >
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  {book.link ? <Card.Text><a href={book.link} rel="noopener noreferrer" target="_blank">More Information on Google Books</a></Card.Text> : null}
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book
                  </Button>
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

export default SavedBooks;