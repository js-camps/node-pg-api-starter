const express = require('express');

const usersRouter = require('./routes/users');
const Router = require('./routes/index');

const app = express();

app.use('/users', usersRouter);
app.use('/', Router);


  

module.exports = app;