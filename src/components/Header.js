import React from "react";
import Link from "next/link";

import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link href="/">
          <a className="logo">Is it dead..?</a>
        </Link>
      </h1>
      <nav className="navbar-items">
        <ul>
          <li className="btn">
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          {/* <li className="btn__sign-up">Sign Up</li>
          <li className="btn">
            <Link href="/login"><a>Login</a></Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
