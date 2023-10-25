import React from 'react'; //Import the React library to use React components and features.
import ReactDOM from 'react-dom';// Import the ReactDOM library to interact with the DOM and render React components.
import 'bootstrap/dist/css/bootstrap.min.css';// Import the Bootstrap CSS file to apply Bootstrap styles to the application.
import './index.css';// Import a custom CSS file for additional styling.
import App from './App';// Import the main application component, which is defined in the 'App.js' file.

//to render the root component (<App />) into the HTML element with the id of 'root'. 
//This is where the entire React application will be displayed in the HTML document.

//The <React.StrictMode> component is used for running some checks and warnings during development to help identify potential problems in 
//the application.

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
