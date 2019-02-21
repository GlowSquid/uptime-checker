const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, PUT, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } else {
    res.send('kek');
  }
  next();
});

const port = process.env.PORT || 5002;

const db = require('./dbconfig').mongoURI;

mongoose.connect(db, { useNewUrlParser: true }).then(() => {
  console.log('db up');
  app.listen(port);
});
