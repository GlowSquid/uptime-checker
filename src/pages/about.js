import Layout from "../components/Layout";

import "../styles/about.css";

export default function About() {
  return (
    <Layout>
      <div className="container about">
        <p>
          IsItDead is a free tool to check the status of any given URL or IP,
          displaying any http-errors it might reveal.
        </p>

        <p>
          The site is made using the MERN-stack with Next.js, and uses Curl
          through Bash to check queries in the backend.
        </p>
        <p>
          This project is free and open source on{" "}
          <a
            href="https://github.com/GlowSquid/IsItDead"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          . Star it if you like it, and feel free to fork it.
        </p>
      </div>
    </Layout>
  );
}
