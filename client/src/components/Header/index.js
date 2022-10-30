import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';



const Header = () => {
  return (
    <header>
      <nav className="mb-4 navbar navbar-expand-lg" style={{ height: 120, backgroundColor: "#00ABB3" }}>
        <div className="container-fluid justify-content-lg-between justify-content-sm-between">
          <Link className="navbar-brand ms-5" style={{ fontFamily: 'JetBrains, cursive', fontSize: 50, color: "#FFD372" }} to="/">Memory Game</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse flex-grow-0" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
              {/* <li className="nav-item">
                <a className="nav-link active" style={{ color: "#FAD6A5", fontSize: 25, borderRight: "1px solid #F0EBCE"}} aria-current="page" href="#">User's Profile</a>
              </li> */}
              
              <li className="nav-item">
                <Link className="nav-link" style={{ fontSize: 25, textDecoration: 'none', color: '#FAD6A5'}} to="/" >Home</Link>
              </li>
              <Navbar />
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
