import React, { Component } from "react";
// import { exec } from "child_process";

// import jimmy from "../../curl.sh"

import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curlOutput: "",
      curlThis: "",
      output: "",
      cn: "banana"
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
    fetch("http://localhost:5002/curl")
      .then(res => res.json())
      .then(json => {
        this.setState({ cn: "output__test", curlOutput: json.output });

        // if (json.output === "22") {
        //   this.setState({
        //     cn: "output__error",
        //     curlOutput: "Yup, it's dead. Error: 502 Bad Gateway"
        //   });
        // } else if (json.output === "1)") {
        //   this.setState({
        //     cn: "output__error",
        //     curlOutput: "This is not a valid URL"
        //   });
        // } else if (json.output === "6)") {
        //   this.setState({
        //     cn: "output__error",
        //     curlOutput: "Yup, it's dead. Error: Could not resolve host"
        //   });
        // } else if (json.output === "7)") {
        //   this.setState({
        //     cn: "output__error",
        //     curlOutput: "Failed to connect. Are you even online?"
        //   });
        // } else {
        //   this.setState({ cn: "output__success", curlOutput: json.output });
        // }
      })
      .catch(error => console.log("error: ", error));
  };

  onChange(e) {
    this.setState({ curlThis: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.fetchCurl();
  }

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
            Submit
          </button>
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
