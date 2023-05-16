import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    } else if (firstName.length > 25) {
      errors.firstName = 'First name should be maximum 25 characters';
    }

    if (!lastName) {
      errors.lastName = 'Last name is required';
    } else if (lastName.length > 25) {
      errors.lastName = 'Last name should be maximum 25 characters';
    }

    if (!email) {
      errors.email = 'E-mail is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid e-mail address';
    } else if (email.length > 50) {
      errors.email = 'E-mail should be maximum 50 characters';
    }

    if (!message) {
      errors.message = 'Message is required';
    } else if (message.length > 500) {
      errors.message = 'Message should be maximum 500 characters';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Send AJAX request to the API
      const formData = { firstName, lastName, email, message };
      try {
        await axios.post('http://localhost:3000/api/contacts', formData);
        // Reset form
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
        setErrors({});
        setSuccess(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      className='form-body'
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <h3>Contact Form</h3>
      <TextField
        required
        id='firstName'
        label={'First Name'}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        error={errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        required
        id='lastName'
        label='Last Name'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        error={errors.lastName}
        helperText={errors.lastName}
      />
      <TextField
        required
        id='email'
        label='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        helperText={errors.email}
      />
      <div className='message-container'>
        <label htmlFor='message'>Message:</label>
        <textarea
          className='message-textarea'
          style={
            errors.message && {
              outline: '1px solid #d32f2f',
            }
          }
          id='message'
          label='Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {errors.message && <span className='error'>{errors.message}</span>}
      </div>
      <Button type='submit' variant='contained'>
        Submit
      </Button>
      {success && <span className='success'>Form Submitted Successfully</span>}
    </Box>
  );
};

export default ContactForm;
