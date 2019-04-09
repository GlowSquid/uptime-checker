import React, { Component } from 'react';

import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curlOutput: '',
      icon: '',
      curlThis: '',
      bg: 'output__blank',
      input: 'input'
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

    // Switch these between production & development
    fetch('http://localhost:5003/api/curl', options)
      // const thisURL = window.location.href+"api/curl"
      // fetch(thisURL, options)
      .then(res => res.json())
      .then(json => {
        if (json.output === "It's still alive!") {
          this.setState({
            bg: 'output__success',
            curlOutput: json.output,
            icon: 'fas fa-check'
          });
          // Client Errors
        } else if (
          json.output === 'This is not a valid URL' ||
          json.output === 'Please enter any URL or IP' ||
          json.output === 'No Symbols Allowed'
        ) {
          this.setState({
            bg: 'output__info',
            curlOutput: json.output,
            icon: 'fas fa-exclamation',
            input: 'input__error'
          });
          // temp fix for syntax error
          // } else if (json.output === "00") {
          //   this.setState({
          //     bg: "output__info",
          //     curlOutput: "This is not a valid URL",
          //     icon: "fas fa-exclamation"
          //   });
        } else {
          // HTTP & Curl Error Codes
          if (json.output === '22400') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 400 Bad Request"
            });
          } else if (json.output === '22401') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 401 Unauthorized"
            });
          } else if (json.output === '22403') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 403 Forbidden"
            });
          } else if (json.output === '22404') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 404 Not Found"
            });
          } else if (json.output === '22405') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 405 Method Not Allowed"
            });
          } else if (json.output === '22406') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 406 Not Acceptable"
            });
          } else if (json.output === '22407') {
            this.setState({
              curlOutput:
                "Yup, it's dead. Error: 407 Proxy Authentication Required"
            });
          } else if (json.output === '22408') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 408 Request Timeout"
            });
          } else if (json.output === '22409') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 409 Conflict"
            });
          } else if (json.output === '22410') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 410 Gone"
            });
          } else if (json.output === '22411') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 411 Length Required"
            });
          } else if (json.output === '22412') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 412 Precondition Failed"
            });
          } else if (json.output === '22413') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 413 Payload Too Large"
            });
          } else if (json.output === '22414') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 414 URI Too Long"
            });
          } else if (json.output === '22415') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 415 Unsupported Media Type"
            });
          } else if (json.output === '22416') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 416 Range Not Satisfiable"
            });
          } else if (json.output === '22417') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 417 Expectation Failed"
            });
          } else if (json.output === '22418') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 418 I'm a teapot(?)"
            });
          } else if (json.output === '22422') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 422 Unprocessable Entity"
            });
          } else if (json.output === '22425') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 425 Too Early"
            });
          } else if (json.output === '22426') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 426 Upgrade Required"
            });
          } else if (json.output === '22428') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 428 Precondition Required"
            });
          } else if (json.output === '22429') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 429 Too Many Requests"
            });
          } else if (json.output === '22431') {
            this.setState({
              curlOutput:
                "Yup, it's dead. Error: 431 Request Header Fields Too Large"
            });
          } else if (json.output === '22451') {
            this.setState({
              curlOutput:
                "Yup, it's dead. Error: 451 Unavailable For Legal Reasons"
            });
          } else if (json.output === '22500') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 500 Internal Server Error"
            });
          } else if (json.output === '22501') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 501 Not Implemented"
            });
          } else if (json.output === '22502') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 502 Bad Gateway"
            });
          } else if (json.output === '22503') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 503 Service Unavailable"
            });
          } else if (json.output === '22504') {
            this.setState({
              curlOutput: "Yup, it's dead. Error: 504 Gateway Timeout"
            });
          } else if (json.output === '22505') {
            this.setState({
              curlOutput:
                "Yup, it's dead. Error: 505 HTTP Version Not Supported"
            });
          } else if (json.output === '22511') {
            this.setState({
              curlOutput:
                "Yup, it's dead. Error: 511 Network Authentication Required"
            });
            // Error 51 only in old versions of Curl
          } else if (json.output === '60' || json.output === '51') {
            this.setState({
              curlOutput:
                'This site seems to use an invalid SSL-certificate or SSH md5 fingerprint'
            });
          } else if (json.output === '6') {
            this.setState({
              curlOutput:
                "Yup, it's pretty dead alright. Error: Could not resolve host"
            });
            // } else if (json.output === "7") {
            //   this.setState({
            //     curlOutput: "Failed to connect. Are you even online?"
            //   });
          } else if (
            json.output === '780' ||
            (json.output.startsWith('7') && json.output.endsWith('80'))
          ) {
            this.setState({
              curlOutput:
                'Failed to connect. Error: Connection refused on port 80'
            });
          } else if (
            json.output === '7443' ||
            (json.output.startsWith('7') && json.output.endsWith('443'))
          ) {
            this.setState({
              curlOutput:
                'Failed to connect. Error: Connection refused on port 443'
            });
          } else if (json.output === '35') {
            this.setState({
              curlOutput: 'A problem occured somewhere in the SSL/TLS handshake'
            });
          } else if (json.output === '52') {
            this.setState({
              curlOutput:
                'Nothing was returned. Getting nothing is considered an error'
            });
          } else {
            this.setState({ curlOutput: json.output + ' | Other error' });
          }
          this.setState({
            bg: 'output__error',
            icon: 'fas fa-times'
          });
        }
      })
      .catch(err => {
        console.log('error', err);
        this.setState({
          bg: 'output__error',
          curlOutput:
            'Sorry! We appear to be having internal server issues. Please try your query again later.'
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
    let pickProtocol = this.state.curlThis;
    if (pickProtocol.startsWith('http://')) {
      this.fetchCurl(this.state.curlThis);
    } else if (pickProtocol.startsWith('https://')) {
      this.fetchCurl(this.state.curlThis);
    } else {
      this.fetchCurl('https://' + pickProtocol);
      pickProtocol = 'https://' + pickProtocol;
    }

    this.setState({
      bg: 'output__loading',
      curlOutput: 'Checking ' + pickProtocol,
      icon: ''
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
                bg: 'output__blank',
                icon: '',
                curlOutput: '',
                input: 'input'
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

export default Main;
