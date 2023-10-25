// Import necessary modules and components
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from "@apollo/client"; // Import useMutation to execute GraphQL mutations

// Import the loginUser function for making API requests
import { loginUser } from '../utils/API';

// Import the Auth utility for managing user authentication
import Auth from '../utils/auth';

//import LOGIN USER mutation
import {LOGIN_USER} from "../utils/mutations";

// Define the functional component for the login form
const LoginForm = () => {
  
  // Initialize the component state for user form data, form validation, and alert display
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false); // Form validation status
  const [showAlert, setShowAlert] = useState(false); // Alert display state

  const [loginUser] = useMutation(LOGIN_USER); // Use useMutation to execute the LOGIN_USER mutation
  
  // Create a function to handle changes in form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Create a function to handle the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if the form has all the required fields (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setShowAlert(true);// If the form is not valid, show an alert
      return;
    }

    try {
      // Attempt to log in the user using the 'loginUser' function via the LOGIN_USER mutation
      const { data } = await LOGIN_USER({
        variables: { ...userFormData }
      });

      // Extract the token and user data from the API response
Auth.login(data.login.token);
      
// Log the user data
      console.log(data);

    } catch (err) {
      console.error(err);
      setShowAlert(true); // Display an alert for login failure
    }

    // Clear the form data
    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* Create the login form */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Display an alert if there is an issue with login credentials */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

// Export the LoginForm component
export default LoginForm;
