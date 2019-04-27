import React from "react";

import "../styles/footer.css";

function Footer() {
  return (
    <div>
      <p className="footer">
        &copy; Copyright IsItDead.xyz {new Date().getFullYear()}
      </p>
    </div>
  );
}

export default Footer;
