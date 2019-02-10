import React, { Component } from 'react';

import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div>
        <p className="footer">
          &copy; Copyright IsItDead.xyz {new Date().getFullYear()}
        </p>
      </div>
    );
  }
}

export default Footer;
