import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Header = () => {
  return (
    <header>
     
      <nav class="navbar navbar-expand-sm navbar-light bg-info mt-3">
        <div class="container-fluid ">
          <a class="navbar-brand " href="#">Memory Game</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto list-unstyled">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">User's Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">High Scores</a>
              </li>
              <li class="nav-item">
                <a class="nav-link " href="#" ><Navbar className='style=text-decoration-none' /></a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>




      <div>
        <p>Simple App to View Users.</p>
      </div>
    </header >
  );
};

export default Header;
