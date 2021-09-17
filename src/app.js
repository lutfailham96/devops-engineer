const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const router = require('./routes');

const app = express();

// set response wrapper
app.response.sendWrapped = function (data, statusCode = httpStatus.OK) {
  return this.status(statusCode).send({
    status: statusCode,
    data,
  });
};

// enable cors
app.use(cors());
app.options('*', cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// import routes
app.use(router);

// handle validation errors
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      status: 400,
      message: err.error.toString(),
    });
  } else {
    next(err);
  }
});

module.exports = app;
