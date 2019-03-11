import React, { Component } from 'react';

import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curlOutput: '',
      curlThis: '',
      cn: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.fetchCurl();
  // }

  // componentWillUnmount() {
  //   clearTimeout(this.timer);
  // }

  fetchCurl = curlThis => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ curlThis })
    };

    fetch('http://localhost:5002/curl', options)
      .then(res => res.json())
      .then(json => {
        if (json.output === 'alive') {
          this.setState({
            cn: 'output__success',
            curlOutput: "It's still alive!"
          });
        } else if (json.output === '') {
          this.setState({
            cn: 'output__loading',
            curlOutput: 'Please enter any URL or IP'
          });
        } else if (json.output === '22403') {
          this.setState({
            cn: 'output__error',
            curlOutput: "It's alive, but forbidden. Error: 403"
          });
        } else if (json.output === '22404') {
          this.setState({
            cn: 'output__error',
            curlOutput: "Yup, it's dead. Error: 404 Not Found"
          });
        } else if (json.output === '22502') {
          this.setState({
            cn: 'output__error',
            curlOutput: "Yup, it's dead. Error: 502 Bad Gateway"
          });
        } else if (
          json.output === '1' ||
          json.output === '3' ||
          json.output === '00' ||
          json.output === '01'
        ) {
          this.setState({
            cn: 'output__error',
            curlOutput: 'This is not a valid URL.'
          });
        } else if (json.output === '3') {
          this.setState({
            cn: 'output__error',
            curlOutput: 'This is not a valid URL.'
          });
        } else if (json.output === '6') {
          this.setState({
            cn: 'output__error',
            curlOutput:
              "Yup, it's pretty dead alright. Error: Could not resolve host"
          });
        } else if (json.output === '7') {
          this.setState({
            cn: 'output__error',
            curlOutput: 'Failed to connect. Are you even online?'
          });
        } else {
          this.setState({ cn: 'output__test', curlOutput: json.output });
        }
      })
      .catch(err => {
        console.log('error', err);
        this.setState({
          cn: 'output__error',
          curlOutput:
            'Sorry! We appear to be having internal server issues. Please try your query again later.'
        });
      });
  };

  onChange(e) {
    this.setState({ curlThis: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      cn: 'output__loading',
      curlOutput: 'Checking ' + this.state.curlThis
    });
    console.log('curlOutput:', this.state.curlThis);

    // if contains dot, no symbols, not empty, and has no spaces:
    this.fetchCurl(this.state.curlThis);
  }

  render() {
    return (
      <div className="container">
        <div>
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
          <button className="submit btn">Check</button>
        </form>
        <h3 className={this.state.cn}>{this.state.curlOutput}</h3>
        <label>
          Check to see whether a website is working by pasting its URL!
        </label>
      </div>
    );
  }
}

export default Main;
