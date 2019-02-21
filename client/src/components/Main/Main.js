import React, { Component } from 'react';
import { exec } from 'child_process';

import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curlOutput: 'magic'
      // curlThis: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ curlThis: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ curlOutput: this.state.curlThis });
  }

  curly = _ => {
    exec(
      `curl -sSf ${this.state.curlThis}`,
      (err, stdout, stderr, exitreason, exitcode) => {
        console.log(stdout);
        process.stdout.write(stdout);
        process.stderr.write(stderr);
        if (err) {
          console.log(stderr.slice(7, 9));
        }
      }
    );
  };

  render() {
    return (
      <div className="container">
        <div className="head">
          <h1>Is it dead..?</h1>
        </div>
        <form onSubmit={this.onSubmit} className="search-form">
          <input
            className="input"
            placeholder=" https://www.yoursite.com/"
            type="text"
            value={this.state.text}
            onChange={this.onChange}
          />
          <button className="submit" id="btn">
            Check
          </button>
        </form>
        <div>{this.state.curlOutput}</div>
        <label>
          Check to see whether a website is working by pasting its URL!
        </label>
      </div>
    );
  }
}

export default Main;
