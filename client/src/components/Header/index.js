import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';



const Header = () => {
  return (
    <header>
     
      <nav className="navbar navbar-expand-sm navbar-light" style={{height: 120, backgroundColor: "#00ABB3"}}>
        <div className="container-fluid ">
          <a className="navbar-brand" style={{fontFamily: 'Shadows Into Light Two, cursive', fontSize: 36, color: "#FFD372"}}  href="#">Memory Game</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto list-unstyled">
              <li class="nav-item">
                <a class="nav-link active" style={{color: "#FAD6A5", fontSize: 20}} aria-current="page" href="#">User's Profile</a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link" style={{color: "#FAD6A5", fontSize: 20}} href="#">High Scores</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" style={{fontSize: 20}} href="#" ><Navbar /></a>
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
