import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Header = () => {
  return (
    <header>
      {/* <div>
        <h3>Memory Game</h3>
        <Link to="/">
          <h1>User List</h1>
        </Link>
      </div> */}
      <ul class="nav justify-content-end bg-dark mt-3">
      <div>
        <h3 className='bg-light mr-5'>Memory Game</h3>
      </div>
      
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">User's Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">High Scores</a>
        </li>
        <li class="nav-item">
        <Navbar />   
        </li>
      </ul>

      <div>
        <p>Simple App to View Users.</p>
      </div>
    </header>
  );
};

export default Header;
