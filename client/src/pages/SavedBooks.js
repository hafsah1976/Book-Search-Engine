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
  const [deleteBook] = useMutation(REMOVE_BOOK);

  // Define a function that handles book deletion
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
    await deleteBook({
      variables: { bookId: bookId },
update: (cache) => {
  // Read the current user data from the cache using the GET_ME query
  const data = cache.readQuery({ query: GET_ME });

  // Extract the user's data and their savedBooks array from the cache
  const userDataCache = data.me;
  const savedBooksCache = userDataCache.savedBooks;

}

        variables: { bookId }
      });

      // Log the mutation response
      console.log(data);

      // Update userData by removing the book //finally debugged this assignement.//this is the line that was actually supposed to go inside the container to Display the title with the number of saved books (lines 62 to 70) *
      //userData.me.savedBooks = userData.me.savedBooks.filter((book) => book.bookId !== bookId);

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
    <>
    <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
      {/* Display the title with the number of saved books (if any) */}
      <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col className={"md=4"}>
                <Card key={book.bookId} border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                <p className={'small'}>Authors: {book.authors}</p>
                <Card.Text>{book.description}</Card.Text>
                {/* Add a button to delete the book */}
                <Button
                      className={"btn-block btn-danger"}
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
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