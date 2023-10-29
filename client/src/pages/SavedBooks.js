import React from 'react';
import { Container, Card, Button, Col, Row } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  const [removeBook] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId) => {
    const token = Auth.getToken();
    if (!token) {
      return false;
    }

    try {
      await removeBook({
        variables: { bookId },
      });

      removeBookId(bookId);
    } catch (err) {
      console.error("Something went wrong while deleting the book. Please try again.", err);
    }
  };

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
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => (
            <Col key={book.bookId}>
              {book.image && <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />}
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <p className='small'>Authors: {book.authors}</p>
                <Card.Text>{book.description}</Card.Text>
                <Button
                  className="btn-block btn-danger"
                  onClick={() => handleDeleteBook(book.bookId)}>
                  Delete this Book!
                </Button>
              </Card.Body>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;