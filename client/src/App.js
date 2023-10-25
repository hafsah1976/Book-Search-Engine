import React from 'react'; // Import the React library for creating components
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'; // Import Apollo Client and related modules for handling GraphQL data
import { setContext } from '@apollo/client/link/context'; // Import setContext for setting up context for Apollo Client
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import components from 'react-router-dom' for handling client-side routing

import SearchBooks from './pages/SearchBooks'; // Import the SearchBooks page component
import SavedBooks from './pages/SavedBooks'; // Import the SavedBooks page component
import Navbar from './components/Navbar'; // Import the Navbar component for navigation

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<SearchBooks />} 
          />
          <Route 
            path='/saved' 
            element={<SavedBooks />} 
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
