import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const Header = () => {
  return (
    <header>
      <nav
        className="mb-4 navbar navbar-expand-lg"
        style={{ height: 90, backgroundColor: "#00ABB3" }}
      >
        <div className="container-fluid justify-content-lg-between justify-content-sm-between">
          <Link
            className="navbar-brand ms-5 fs-1"
            style={{
              fontFamily: "JetBrains, cursive",
              color: "#FFD372",
            }}
            to="/"
          >
            Memory Game
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ backgroundColor: "#FAD6A5" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-grow-0"
            id="navbarNavDropdown"
            stye={{ backgroundColor: "#00ABB3" }}
          >
            <ul className="navbar-nav me-auto my-2 my-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fs-3"
                  style={{
                    textDecoration: "none",
                    color: "#FFD372",
                    backgroundColor: "#00ABB3",
                  }}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <Navbar />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
