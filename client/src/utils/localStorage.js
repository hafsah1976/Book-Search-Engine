//Function to get saved book IDs from local storage
export const getSavedBookIds = () => {
  // Check if there are saved book IDs in local storage, and parse the data
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};

// Function to save book IDs to local storage
export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    // If there are book IDs in the array, save them to local storage
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    // If the array is empty, remove the saved_books entry from local storage
    localStorage.removeItem('saved_books');
  }
};

// Function to remove a book ID from local storage
export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false; // Return false if there are no saved book IDs
  }

  // Filter the book IDs to remove the specified book ID
  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);

  // Update the local storage with the new book IDs
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true; // Return true to indicate success
};
