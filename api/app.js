const express = require('express');

const app = express();

/* GET root. */
app.get('/', function(req, res) {
    res.json({api: "up"});
  });

module.exports = app;