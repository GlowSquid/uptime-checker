import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>
        <NavLink to="/" className="logo">
          Is it dead..?
        </NavLink>
      </h1>
      <nav className="navbar-items">
        <ul>
          <li className="btn">
            <NavLink to="/about">About</NavLink>
          </li>
          {/* <li className="btn__sign-up">Sign Up</li>
          <li className="btn">
            <NavLink to="/login">Login</NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
