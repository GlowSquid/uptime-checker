import { Component } from "react";
// import fetch from "isomorphic-unfetch";

import "../styles/main.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curlOutput: "",
      icon: "",
      curlThis: "",
      bg: "output__blank",
      input: "input"
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

  fetchCurl(curlThis) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ curlThis })
    };

    let environment;
    {
      process.env.NODE_ENV === "development"
        ? (environment = "http://localhost:5003/api/curl")
        : (environment = window.location.href + "api/curl");
    }

    fetch(environment, options)
      .then(res => res.json())
      .then(json => {
        if (json.output === "It's still alive!") {
          this.setState({
            bg: "output__success",
            curlOutput: json.output,
            icon: "fas fa-check"
          });
          // Client Errors
        } else if (
          json.output === "This is not a valid URL" ||
          json.output === "Please enter any URL or IP" ||
          json.output === "No Symbols Allowed"
        ) {
          this.setState({
            bg: "output__info",
            curlOutput: json.output,
            icon: "fas fa-exclamation",
            input: "input__error"
          });
          // temp fix for syntax error
          // } else if (json.output === "00") {
          //   this.setState({
          //     bg: "output__info",
          //     curlOutput: "This is not a valid URL",
          //     icon: "fas fa-exclamation"
          //   });
        } else {
          let msg;
          const yup = "Yup, it's dead. Error: ";
          // HTTP & Curl Error Codes
          if (json.output === "22400") {
            msg = yup + "400 Bad Request";
          } else if (json.output === "22401") {
            msg = yup + "401 Unauthorized";
          } else if (json.output === "22403") {
            msg = yup + "403 Forbidden";
          } else if (json.output === "22404") {
            msg = yup + "404 Not Found";
          } else if (json.output === "22405") {
            msg = yup + "405 Method Not Allowed";
          } else if (json.output === "22406") {
            msg = yup + "406 Not Acceptable";
          } else if (json.output === "22407") {
            msg = yup + "407 Proxy Authentication Required";
          } else if (json.output === "22408") {
            msg = yup + "408 Request Timeout";
          } else if (json.output === "22409") {
            msg = yup + "409 Conflict";
          } else if (json.output === "22410") {
            msg = yup + "410 Gone";
          } else if (json.output === "22411") {
            msg = yup + "411 Length Required";
          } else if (json.output === "22412") {
            msg = yup + "412 Precondition Failed";
          } else if (json.output === "22413") {
            msg = yup + "Error: 413 Payload Too Large";
          } else if (json.output === "22414") {
            msg = yup + "414 URI Too Long";
          } else if (json.output === "22415") {
            msg = yup + "415 Unsupported Media Type";
          } else if (json.output === "22416") {
            msg = yup + "416 Range Not Satisfiable";
          } else if (json.output === "22417") {
            msg = yup + "417 Expectation Failed";
          } else if (json.output === "22418") {
            msg = yup + "418 I'm a teapot(?)";
          } else if (json.output === "22422") {
            msg = yup + "422 Unprocessable Entity";
          } else if (json.output === "22425") {
            msg = yup + "425 Too Early";
          } else if (json.output === "22426") {
            msg = yup + "426 Upgrade Required";
          } else if (json.output === "22428") {
            msg = yup + "428 Precondition Required";
          } else if (json.output === "22429") {
            msg = yup + "429 Too Many Requests";
          } else if (json.output === "22431") {
            msg = yup + "431 Request Header Fields Too Large";
          } else if (json.output === "22451") {
            msg = yup + "451 Unavailable For Legal Reasons";
          } else if (json.output === "22500") {
            msg = yup + "500 Internal Server Error";
          } else if (json.output === "22501") {
            msg = yup + "501 Not Implemented";
          } else if (json.output === "22502") {
            msg = yup + "502 Bad Gateway";
          } else if (json.output === "22503") {
            msg = yup + "503 Service Unavailable";
          } else if (json.output === "22504") {
            msg = yup + "504 Gateway Timeout";
          } else if (json.output === "22505") {
            msg = yup + "505 HTTP Version Not Supported";
          } else if (json.output === "22511") {
            msg = yup + "511 Network Authentication Required";
            // Error 51 only in older versions of Curl
          } else if (json.output === "60" || json.output === "51") {
            msg =
              "This site seems to use an invalid SSL-certificate or SSH md5 fingerprint";
          } else if (json.output === "6") {
            msg =
              "Yup, it's pretty dead alright. Error: Could not resolve host";
            // } else if (json.output === "7") {
            //   this.setState({
            //     curlOutput: "Failed to connect. Are you even online?"
            //   });
          } else if (
            json.output === "780" ||
            (json.output.startsWith("7") && json.output.endsWith("80"))
          ) {
            msg = "Failed to connect. Error: Connection refused on port 80";
          } else if (
            json.output === "7443" ||
            (json.output.startsWith("7") && json.output.endsWith("443"))
          ) {
            msg = "Failed to connect. Error: Connection refused on port 443";
          } else if (json.output === "35") {
            msg = "A problem occured somewhere in the SSL/TLS handshake";
          } else if (json.output === "52") {
            msg =
              "Nothing was returned. Getting nothing is considered an error";
          } else {
            msg = json.output + " | Error";
          }
          this.setState({
            curlOutput: msg,
            bg: "output__error",
            icon: "fas fa-times"
          });
        }
      })
      .catch(err => {
        console.log("error", err);
        this.setState({
          bg: "output__error",
          curlOutput:
            "Sorry! We appear to be having internal server issues. Please try your query again later."
        });
      });
  }
  onChange(e) {
    this.setState({
      curlThis: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let pickProtocol = this.state.curlThis;

    // pickProtocol.startsWith('http://') ||
    // pickProtocol.startsWith('https://')
    //   ? this.fetchCurl(this.state.curlThis)
    //   : this.fetchCurl('https://' + pickProtocol);

    if (
      pickProtocol.startsWith("https://") ||
      pickProtocol.startsWith("http://")
    ) {
      this.fetchCurl(this.state.curlThis);
    } else {
      this.fetchCurl("https://" + pickProtocol);
      pickProtocol = "https://" + pickProtocol;
    }

    this.setState({
      bg: "output__loading",
      curlOutput: "Checking " + pickProtocol,
      icon: ""
    });
    // console.log('curlOutput:', this.state.curlThis);
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit} className="search-form">
          <input
            onClick={() => {
              this.setState({
                bg: "output__blank",
                icon: "",
                curlOutput: "",
                input: "input"
              });
            }}
            className={this.state.input}
            placeholder=" https://www.YourSite.com/"
            type="text"
            value={this.state.text}
            onChange={this.onChange}
          />
          <button className="submit check__btn">Check</button>
          {/* <button className="submit">Check</button> */}
        </form>

        <div className={this.state.bg}>
          <h4>
            <i className={this.state.icon} />
            {this.state.curlOutput}
          </h4>
          {/* <h3 className="more__info">Read more..</h3> */}
        </div>

        <label>
          Check to see whether a website is working by pasting its URL!
        </label>
      </div>
    );
  }
}
