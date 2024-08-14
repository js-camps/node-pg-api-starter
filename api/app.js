const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const config_result = dotenv.config();
if(config_result.error) { throw config_result.error }

const authRouter = require("../auth/auth-router");
const usersRouter = require("../api/routes/users");

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors())

// application routes
app.use("/api/auth", authRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send(`<p> Hello, 4g mates! </p>`)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json( {error: "Route '"+req.url+"' Not Found."} );
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(req.app.get('env') === 'development') {
    console.log(err);
  }

  // render the error page
  res.status(err.status || 500);
  res.json({error: res.locals.error});
});

module.exports = app;
