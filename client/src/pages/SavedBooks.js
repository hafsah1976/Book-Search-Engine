import React from 'react';
import { Container, Card, Button, Col, Row } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // Use the useQuery hook to fetch user data based on the GET_ME query
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  //adding error handling for accessing saved books
  if(!userData?.username){
    return (
      <h3>You must be logged in to access saved books. Please log in or sign up.</h3>
    );
  }

  // Function to handle deleting a book
  const handleRemoveBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Use the removeBook mutation to delete the book
      await removeBook({
        variables: { bookId: bookId },
        update: cache => {
          const data = cache.readyQuery ({query: GET_ME});
          const userDataCache= data.me;
          const savedBooksCache = userDataCache.savedBooks;
          const updatedBookCache = savedBooksCache.filter((book) => book.bookId !== bookId); 
        data.me.savedBooks = updatedBookCache;
        cache.writeQuery({ query: GET_ME , data: {data: {...data.me.savedBooks}}})      
    }
  });
      // if (error) {
      //   throw new Error('Something went wrong! ' + error.message);
      // }

      // when successfully logged in or signed up, remove the book from local storage
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
      <div fluid="true" className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2>
          {userData.savedBooks && userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:` // Added closing bracket here
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks && userData.savedBooks.length > 0 ? (
            userData.savedBooks.map((book) => (
              <Col key={book.bookId} border="dark"> {/* Removed the extra parentheses */}
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Col>
            ))
          ) : (
            // Placeholder for what you want to display when there are no saved books
            <p>No saved books found.</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
