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

      {/* <div class="container mb-5">
        <h3 class="py-3 text-center">Memory Game</h3>
        <div class="row py-3">
          <div class="col">
            <nav class="navbar navbar-expand-md navbar-light bg-light">
              {/* <a href="#" class="navbar-brand">Cubator 1ne</a> */}
      {/* <div><h2>Memory Game</h2></div> */}
      {/* <div className=''>
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item"><a href="" class="nav-link">User's Profile</a></li>
                  <li class="nav-item"><a href="" class="nav-link">High Scores</a></li>
                  <li class="nav-item"><Navbar /></li>
                </ul>
              </div>

            </nav>
          </div>
        </div>
      </div> */}

      <nav class="navbar navbar-expand-sm navbar-light bg-danger mt-3">
        <div class="container-fluid ">
          <a class="navbar-brand ">Memory Game</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto">
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
