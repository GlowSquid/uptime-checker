const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const { exec } = require("child_process");
const { join } = require("path");

// const bodyParser = require('body-parser');

const app = express();
app.use(express.static(join(__dirname, "bin")));

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/curl", (req, res, curlThis) => {
  exec(
    join(__dirname, "bin", "curl.sh https://glowsquid.com/ipp/"),
    (err, stdout, stderr) => {
      if (stderr === null || stderr === "") {
        return res
          .status(200)
          .json({ output: "It's still alive!", error: null });
      } else if (stdout === null || stdout === "") {
        // return res.status(200).json({ output: stderr.slice(7, 9) });
        // console.log("curlThis", curlThis);
        return res.status(200).json({ output: stderr });
      } else {
        return res.status(400).json({ output: null, error: err.message });
      }
    }
  );
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    res.send("kek");
  }
  next();
});

const port = process.env.PORT || 5002;

const db = require("./dbconfig").mongoURI;

mongoose.connect(db, { useNewUrlParser: true }).then(() => {
  console.log("db up");
  app.listen(port);
});
