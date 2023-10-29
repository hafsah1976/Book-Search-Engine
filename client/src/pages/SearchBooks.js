import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";
//import { GET_ME } from '../utils/queries';
import Auth from "../utils/auth";
import { searchGoogleBooks } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";

const SearchBooks = () => {
  // Create a mutation function for saving books
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  // Create a state to store data returned from the Google API
  const [searchedBooks, setSearchedBooks] = useState([]);

  // Create a state to store the data entered in the search field
  const [searchInput, setSearchInput] = useState(getSavedBookIds());

  // Create a state to store the IDs of saved books
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // Set up a useEffect hook to save the `savedBookIds` list to local storage when the component unmounts.
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
      const response = await searchGoogleBooks(searchInput);

      // Check if the response is not okay (HTTP status code indicates an error).
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      // Parse the response JSON and extract the 'items' data.
      const { items } = await response.json();

      // Map the fetched book data to a new format and set the component state.
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author available"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        //link: book.volumeInfo.infoLink,
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }));

      // Update the state with the formatted book data.
      setSearchedBooks(bookData);

      // Clear the search input field after processing the search.
      setSearchInput("");
    } catch (error) {
      // Handle errors in case of network issues or other problems.
      console.error("Error:", error);
    }
  };

  // Define a function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // Find the book in the `searchedBooks` state that matches the given bookId
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // Get the user's authentication token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      // If there is no authentication token, return early
      return false;
    }

    try {
      // Use the saveBook mutation to save a book, with the 'bookToSave' variable as the input.
      // Also, update the Apollo Client cache with the new book data.
      const { data } = await saveBook({
        variables: { book: bookToSave },
      });
      if (error) {
        throw new Error("Please try again.!");
      }
      console.log("book", data);

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a book"
                />
              </Col>
              <Col md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a book to begin"}
        </h2>
        <Row>
          {searchedBooks.map((book) => (
            <Col md={4} key={book.bookId}>
              <Card border="dark">
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {savedBookIds && (
                    <Button
                      disabled={savedBookIds.includes(book.bookId)}
                      className="btn-block btn-info"
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      {savedBookIds.includes(book.bookId)
                        ? "This book has already been saved!"
                        : "Save this Book!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
