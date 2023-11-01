import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
//import { searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

const SearchBooks = () => {

  //state for holding google api data
  const [searchedBooks, setSearchedBooks] = useState([]);

  const [searchInput, setSearchInput] = useState('');// state for holding search field input

  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());//state for holding saved bookId values

  const [saveBook, { error }] = useMutation(SAVE_BOOK);//define the savebook function from mutation

  useEffect(() => {
    // This effect runs when the component unmounts
    return () => 
      // Save the updated `savedBookIds` array to `localStorage`
      saveBookIds(savedBookIds);
    }); // Empty dependency array to run the effect only on unmount
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://www.googleapis/books/v1/volumes?q=${searchInput}`
        );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  //function to save books to local storage

  const handleSaveBook = async (bookId) => {

    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);//find the book in searchedbooks state by matching id
    
    const token = Auth.loggedIn() ? Auth.getToken() : null; //get token to make sure user is logged in

    if (!token) {
      return false;
    }

    try {
      const {data} = await saveBook({
        variables: { bookData: {...bookToSave}}, 
      });
    console.log("book", savedBookIds);
    console.log("book", data);

    
    setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a book"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Col>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' 
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedId) => savedId === book.bookId
                        )}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}
                      >
                      {savedBookIds?.some((savedId) => savedId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
                      })}
              </Col>
      </Container>
    </>
  );
};
export default SearchBooks;