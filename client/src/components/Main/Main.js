import React, { Component } from "react";

import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curlOutput: "",
      iconOutput: "",
      curlThis: "",
      bgOutput: "output__blank"
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ curlThis })
    };

    fetch("http://localhost:5002/curl", options)
      .then(res => res.json())
      .then(json => {
        if (json.output === "It's still alive!") {
          this.setState({
            bgOutput: "output__success",
            curlOutput: json.output,
            iconOutput: "fas fa-check"
          });
          // Client Errors
        } else if (
          json.output === "This is not a valid URL" ||
          json.output === "Please enter any URL or IP"
        ) {
          this.setState({
            bgOutput: "output__info",
            curlOutput: json.output,
            iconOutput: "fas fa-exclamation"
          });
          // temp fix for syntax error
        } else if (json.output === "00") {
          this.setState({
            bgOutput: "output__info",
            curlOutput: "This is not a valid URL",
            iconOutput: "fas fa-exclamation"
          });
        } else {
          // HTTP & Curl Error Codes
          if (json.output === "22403") {
            this.setState({
              curlOutput: "It's alive, but forbidden. Error: 403"
            });
          } else if (json.output === "22404") {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 404 Not Found"
            });
          } else if (json.output === "22406") {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 406 Not Acceptable"
            });
          } else if (json.output === "22502") {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 502 Bad Gateway"
            });
          } else if (json.output === "6") {
            this.setState({
              curlOutput:
                "Yup, it's pretty dead alright. Error: Could not resolve host"
            });
          } else if (json.output === "7") {
            this.setState({
              curlOutput: "Failed to connect. Are you even online?"
            });
          } else if (json.output === "780") {
            this.setState({
              curlOutput:
                "Failed to connect. Error: Connection refused on port 80"
            });
          } else if (json.output === "7443") {
            this.setState({
              curlOutput:
                "Failed to connect. Error: Connection refused on port 443"
            });
          } else if (json.output === "60") {
            this.setState({
              curlOutput: "This site seems to use an invalid SSL-certificate"
            });
          } else {
            this.setState({ curlOutput: json.output });
          }
          this.setState({
            bgOutput: "output__error",
            iconOutput: "fas fa-times"
          });
        }
      })
      .catch(err => {
        console.log("error", err);
        this.setState({
          bgOutput: "output__error",
          curlOutput:
            "Sorry! We appear to be having internal server issues. Please try your query again later."
        });
      });
  };
  onChange(e) {
    this.setState({
      curlThis: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      bgOutput: "output__loading",
      curlOutput: "Checking " + this.state.curlThis,
      iconOutput: ""
    });
    console.log("curlOutput:", this.state.curlThis);
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
            onClick={() => {
              this.setState({
                bgOutput: "output__blank",
                iconOutput: "",
                curlOutput: ""
              });
            }}
            className="input"
            placeholder=" https://www.YourSite.com/"
            type="text"
            value={this.state.text}
            onChange={this.onChange}
          />
          <button className="submit btn">Check</button>
        </form>
        <div className={this.state.bgOutput}>
          <h3 className="info">
            <i className={this.state.iconOutput} /> {this.state.curlOutput}
          </h3>
          {/* <h3 className="more__info">Read more..</h3> */}
        </div>
        <label>
          Check to see whether a website is working by pasting its URL!
        </label>
      </div>
    );
  }
}

export default Main;
