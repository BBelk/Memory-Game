import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';


const UpdateUser = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [updateUser, { error, data }] = useMutation(UPDATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateUser({
        variables: { ...formState },
      });

      // Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const renderForm = () => {
    if (data) {
      return (
      <p>
         Success! You may now head{' '}
        <Link to="/">back to the homepage.</Link>
        <Link to="/me">Or back to your profile.</Link>
        {/* Success! You may now head{' '}
        <Link to="/">back to the homepage.</Link> */}
      </p>
      )
    } 
    return (
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="Your username"
          name="username"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        <input
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    );
  };

return (
  
  <main>
    <h4>Edit Profile</h4>
    <div>
      {renderForm()}
      {error && <div>{error.message}</div>}
    </div>
  </main>
);
};

export default UpdateUser;
