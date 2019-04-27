const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { exec } = require("child_process");
const { join } = require("path");

const Query = require("./models/Query");
const validateURLInput = require("./validation/url");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: "src", dev });
const handle = app.getRequestHandler();

const PORT = parseInt(process.env.PORT, 10) || 5003;

const db = require("./dbconfig").mongoURI;

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(express.static(join(__dirname, "bin")));

    server.get("/api/count", (req, res) => {
      Query.findOne()
        .then(count => res.status(200).json(count.counter))
        .catch(err => res.status(404).json(0));
    });

    const robotsOptions = {
      root: join(__dirname, "./static"),
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      }
    };

    server.get("/robots.txt", (req, res) => {
      res.status(200).sendFile("robots.txt", robotsOptions);
    });

    const sitemapOptions = {
      root: join(__dirname, "./static"),
      headers: {
        "Content-Type": "text/xml;charset=UTF-8"
      }
    };
    server.get("/sitemap.xml", (req, res) =>
      res.status(200).sendFile("sitemap.xml", sitemapOptions)
    );

    const faviconOptions = {
      root: join(__dirname, "./static")
    };
    server.get("/favicon.ico", (req, res) =>
      res.status(200).sendFile("favicon.ico", faviconOptions)
    );

    const manifestOptions = {
      root: join(__dirname, "./static")
    };
    server.get("/manifest.json", (req, res) =>
      res.status(200).sendFile("manifest.json", manifestOptions)
    );

    const ogpOptions = {
      root: join(__dirname, "./static")
    };
    server.get("/ogp.png", (req, res) =>
      res.status(200).sendFile("ogp.png", ogpOptions)
    );

    server.post("/api/curl", (req, res) => {
      const { errors, isValid } = validateURLInput(req.body);

      if (!isValid) {
        return res.status(400).json({ output: errors.curlThis });
      }

      const curlFriendly = /[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|]/g;

      const url = req.body.curlThis.replace(curlFriendly, "\\$&");
      console.log("Checking: ", url);

      Query.updateOne(
        {
          // _id: "5c87ac29ef027299d3255003"
        },
        { $inc: { counter: 1 } },
        { upsert: true }
      )
        .then(result => {
          console.log("Incremented Count");
        })
        .catch(err => console.log(err));

      exec(join(__dirname, "bin", `curl.sh ${url}`), (err, stdout, stderr) => {
        if (stderr === null || stderr === "") {
          return res
            .status(200)
            .json({ output: "It's still alive!", error: null });
        } else if (stdout === null || stdout === "") {
          // return res.status(200).json({ output: stderr.replace(/\D/g, "") });
          const curlCode = stderr.substr(5, 5); // retrieve curl status code
          const trimmedCurlCode = curlCode.replace(/\D/g, ""); // Remove parenthesis
          const endCode = stderr.replace(/\D/g, ""); // retrieve http status code
          const trimmedEndCode = endCode.slice(0); // Remove Curl Code from http code
          if (
            trimmedCurlCode === "35" ||
            trimmedCurlCode === "60" ||
            trimmedCurlCode === "51" ||
            trimmedCurlCode === "52" ||
            trimmedCurlCode === "6"
          ) {
            return res.status(200).json({
              output: trimmedCurlCode
            });
          } else {
            return res.status(200).json({
              output: trimmedCurlCode + trimmedEndCode.slice(-3)
              // output: stderr.replace(/\D/g, "")
            });
          }
        } else {
          return res.status(400).json({ output: null, error: err.message });
        }
      });
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Server up on :${PORT}`);
    });
    mongoose.connect(db, { useNewUrlParser: true }).then(() => {
      console.log(`> DB up on : ${PORT}`);
      // server.listen(PORT);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
