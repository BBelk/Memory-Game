import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  if (Auth.loggedIn()) {
    return (
      <>
        <Link to="/me">
          {Auth.getProfile().data.username}'s profile
        </Link>
        <button onClick={logout}>
          Logout
        </button>
      </>
    );
  }
  // If logged out show login controls
  return (
    <>
      <Link style={{textDecoration: 'none', color: '#FAD6A5', marginRight: 13}} to="/login">
        Login
      </Link>
      <Link style={{textDecoration: 'none', color: '#FAD6A5'}} to="/signup">
        Signup
      </Link>
    </>
  )
}

export default Navbar
