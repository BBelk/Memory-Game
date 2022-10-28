import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';



const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light" style={{ height: 120, backgroundColor: "#00ABB3" }}>
        <div className="container-fluid ">
          <a className="navbar-brand ms-5" style={{ fontFamily: 'JetBrains, cursive', fontSize: 50, color: "#FFD372" }} href="#">Memory Game</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto list-unstyled me-5">
              {/* <li className="nav-item">
                <a className="nav-link active" style={{ color: "#FAD6A5", fontSize: 25, borderRight: "1px solid #F0EBCE"}} aria-current="page" href="#">User's Profile</a>
              </li> */}
              
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: 25 }} href="#" ><Navbar /></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <div>
        <p>Simple App to View Users.</p>
      </div> */}
    </header >
  );
};

export default Header;
