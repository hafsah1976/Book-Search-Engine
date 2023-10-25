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
  const [validated, setValidated] = useState(false);

  // Manage the visibility of alerts
  const [showAlert, setShowAlert] = useState(false);

   // Use the ADD_USER mutation and get the addUser function and error from useMutation
   const [addUser] = useMutation(ADD_USER);

    // Create a function to handle changes in form inputs
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      // Perform client-side form validation
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true); // Update validation status
        return;
 