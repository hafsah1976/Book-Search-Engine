// Function to get the logged-in user's information from the server (requires a token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    // method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`, // Include the token in the headers for authentication
    },
  });
};

// Function to create a new user by sending user data to the server
export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST', // Use POST method for creating a new user
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData), // Send user data as JSON in the request body
  });
};

// Function to log in a user by sending login credentials to the server
export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST', // Use POST method for user login
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData), // Send login credentials as JSON in the request body
  });
};

// Function to save book data for a logged-in user
export const saveBook = (bookData, token) => {
  return fetch('/api/users', {
    method: 'PUT', // Use PUT method for updating user data with saved books
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`, // Include the token in the headers for authentication
    },
    body: JSON.stringify(bookData), // Send book data as JSON in the request body
  });
};

// Function to remove saved book data for a logged-in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE', // Use DELETE method to remove a saved book
    headers: {
      authorization: `Bearer ${token}`, // Include the token in the headers for authentication
    },
  });
};

// Function to make a search request to the Google Books API
// The 'query' parameter is used to specify the search query
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};