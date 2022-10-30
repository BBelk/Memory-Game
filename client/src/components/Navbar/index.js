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
        <li className="nav-item">
          <Link className="nav-link" style={{ fontSize: 25, textDecoration: 'none', color: '#FAD6A5'}} to="/me">
            {Auth.getProfile().data.username}'s Profile
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link" style={{ fontSize: 25, textDecoration: 'none', color: '#FAD6A5'}} onClick={logout}>
            Logout
          </button>
        </li>
      </>
    );
  }
  // If logged out show login controls
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link" style={{fontSize: 25,textDecoration: 'none', color: '#FAD6A5'}} to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" style={{fontSize: 25,textDecoration: 'none', color: '#FAD6A5'}} to="/signup">
          Signup
        </Link>
      </li>
    </>
  )
}

export default Navbar

