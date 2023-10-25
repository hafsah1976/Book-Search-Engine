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

//This code sets up an Apollo Client with authentication handling by using the setContext function. 
//It adds the token from local storage to the request headers before making a request to the GraphQL API.
//This client can be used in React components to interact with your GraphQL API while handling user authentication.

// Construct our main GraphQL API endpoint using createHttpLink
const httpLink = createHttpLink({
  uri: '/graphql', // Set the URI of your GraphQL API endpoint
});

// Create an authLink to add the authentication token to request headers
const authLink = setContext((_, { headers }) => {
  // Get the token from local storage (you might consider error handling if the token is not present)
  const token = localStorage.getItem('id_token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Set the 'Authorization' header with the token
    },
  };
});

// Create the Apollo Client with the specified configuration
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink), // Chain the authLink and httpLink together
  cache: new InMemoryCache(), // Use an in-memory cache for query results 
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* Use ApolloProvider to provide your Apollo Client to the app */}
      <Router>
        {/* Set up the router for client-side routing */}
        <>
          {/* Wrap the content in an empty fragment */}
          <Navbar />
          <Routes>            
 {/* Render the Navbar component for navigation */}
            {/* Use the Switch component to render different components based on the route */}
            <Route path='/' element={<SearchBooks />} />          
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
