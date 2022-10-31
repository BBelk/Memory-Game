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
          <Link className="nav-link fs-3" style={{ textDecoration: 'none', color: "#FFD372", backgroundColor: "#00ABB3"}} to="/me">
            {Auth.getProfile().data.username}'s Profile
          </Link>
        </li>
        <li className="nav-item">
          <button className="btn fs-3 align-itmes-center" style={{ textDecoration: 'none', color: "#FFD372", backgroundColor: "#00ABB3"}} onClick={logout} type="button">
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
        <Link className="nav-link fs-3" style={{textDecoration: 'none', color: "#FFD372", backgroundColor: "#00ABB3"}} to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link fs-3" style={{textDecoration: 'none', color: "#FFD372", backgroundColor: "#00ABB3"}} to="/signup">
          Signup
        </Link>
      </li>
    </>
  )
}

export default Navbar

