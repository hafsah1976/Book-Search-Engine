import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client'; // Import useMutation from Apollo Client to execute GraphQL mutations
// Import the ADD_USER mutation functionality
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// Define your functional component
const SignupForm = () => {
  // Initialize component state using the useState hook
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

  // Set the form validation status to false
  const [validated] = useState(false);

  // Manage the visibility of alerts
  const [showAlert, setShowAlert] = useState(false);

   // Use the ADD_USER mutation and get the addUser function and error from useMutation
   const [createUser] = useMutation(ADD_USER); // Initialize the ADD_USER mutation

    // Create a function to handle changes in form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Create a function to handle form submission
 const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.currentTarget;
      // Perform client-side form validation
      if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
        try {
          const { data } = await createUserUser({
            variables: { ...userFormData }
          });
    
          Auth.login(data.addUser.token); // Log in the user with the received token
        } catch (err) {
          console.error(err);
          setShowAlert(true);
        }
    
        setUserFormData({
          username: '',
          email: '',
          password: '',
        });
      };
    
      return (
        <>
          {/* This is needed for the validation functionality above */}
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            {/* Show an alert if the server response is bad */}
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
              Something went wrong with your signup!
            </Alert>
    
            <Form.Group >
              <Form.Label htmlFor='username'>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Your username'
                name='username'
                onChange={handleInputChange}
                value={userFormData.username}
                required
              />
              <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group>
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Your email address'
                name='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
              />
              <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group>
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
              disabled={!(userFormData.username && userFormData.email && userFormData.password)}
              type='submit'
              variant='success'>
              Submit
            </Button>
          </Form>
        </>
      );
    };
    
export default SignupForm;
