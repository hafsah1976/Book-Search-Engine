import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";
//This code sets up an Apollo Client with authentication handling by using the setContext function. 
//It adds the token from local storage to the request headers before making a request to the GraphQL API.
//This client can be used in React components to interact with your GraphQL API while handling user authentication.

// Construct our main GraphQL API endpoint using createHttpLink

const httpLink = createHttpLink({
  uri: (process.env.NODE_ENV === 'development') ? 'http://localhost:3001/graphql' : '/graphql',
});

// Create an authLink to add the authentication token to request headers
const authLink = setContext((_, { headers }) => {
  // Get the token from local storage (you might consider error handling if the token is not present)
  const token = localStorage.getItem('id_token');
   return {
  headers: {
  ...headers,
  authorization: token ? `Bearer ${token}` : "", // Set the 'Authorization' header with the token
    },
  };
});

// Create the Apollo Client with the specified configuration
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink), // Chain the authLink and httpLink together
  cache: new InMemoryCache(), // Use an in-memory cache for query results 
  // defaultOptions: {
  //   query: {
  //     errorPolicy: 'all',
  //   },
  //   mutate: {
  //     errorPolicy: 'ignore',
  //   },
//}
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
            <Route  path='/' element={<SearchBooks />} />
            {/* Render the SearchBooks component for the root path */}
            <Route  path='/saved' element={<SavedBooks />} />
            {/* Render the SavedBooks component for the '/saved' path */}
            <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />            {/* Render an error message for any other path */}
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}
export default App;