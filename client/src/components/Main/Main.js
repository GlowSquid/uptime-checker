import React, { Component } from 'react';

import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className="container">
        <div className="head">
          <h1>Is it dead..?</h1>
        </div>
        <form className="search-form">
          <input
            className="input"
            placeholder=" Example:  https://www.yoursite.com/"
            type="text"
          />
          <button className="submit" id="btn">
            Check
          </button>
        </form>
        <label>
          Check to see whether a website is working by pasting its URL!
        </label>
      </div>
    );
  }
}

export default Main;
