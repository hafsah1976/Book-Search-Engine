import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations"; // Import the LOGIN_USER mutation
import Auth from '../utils/auth';

// Define the functional component for the login form
const LoginForm = () => {

   // Initialize the component state for user form data, form validation, and alert display
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);// Form validation status
  const [showAlert, setShowAlert] = useState(false);// Alert display state
  const [login, {error}] = useMutation(LOGIN_USER);// Use useMutation to execute the LOGIN_USER mutation

  useEffect(() => {
    if (error){
      setShowAlert(true);
    } else{
      setShowAlert(false);
    }

  }, [error]);

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
    }

    try {
        // Attempt to log in the user using the 'loginUser' function via the LOGIN_USER mutation
      const { data } = await login({
        variables: { ...userFormData }
      });
//adding error block
      if(error){
        throw new Error("Something does not look right. Please try again.")
      }

 // Extract the token and user data from the API response
 Auth.login(data.login.token);

} catch (err) {
 console.error(err);
 setShowAlert(true); // Display an alert for login failure
}

// Clear the form data
setUserFormData({
  username: '',
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
      <Form.Group>
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

      <Form.Group >
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