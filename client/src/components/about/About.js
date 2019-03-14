import React from "react";

import { Link } from "react-router-dom";

import "./About.css";

const AboutPage = () => {
  return (
    <div className="about">
      <p>
        IsItDead is a free tool to check the uptime of a given location,
        displaying any http-errors it might reveal.
      </p>

      <p>
        The site is made using the MERN-stack and uses Curl through Bash to
        check sites in the backend.
      </p>
      <p>
        This project is free and open source hosted on{" "}
        <Link to="https://github.com/GlowSquid/IsItDead">GitHub</Link>. If you
        like it, please give me a star, and feel free to fork it if you want to
        build on to it.
      </p>
    </div>
  );
};

export default AboutPage;
