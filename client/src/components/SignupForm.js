import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  // Set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

  // Set state for form validation
  const [validated, setValidated] = useState(false);

  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // Use the useMutation hook to execute the ADD_USER mutation
  const [addUser] = useMutation(ADD_USER);

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
  
    setValidated(true);
  
    if (form.checkValidity() === true) {
      try {
        // Execute the ADD_USER mutation with user data
        const { data } = await addUser({
          variables: { ...userFormData },
        });

        // Log in the user by storing the token in local storage
        Auth.login(data.addUser.token);

        // Clear the form and hide any previous alerts
        setUserFormData({ username: '', email: '', password: '' });
        setShowAlert(false);
  
      } catch (err) {
        console.error(err);
        // Show an alert in case of an error
        setShowAlert(true);
      }
    }
  };
    
  return (
    <>
      <Form validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          {error ? "Something went wrong with your signup!" : null}
        </Alert>

        <Form.Group>
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
          variant='success'
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
