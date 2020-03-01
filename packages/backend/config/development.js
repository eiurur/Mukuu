const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const logger = require(path.resolve('logger'));

module.exports = function(app) {
  app.locals.pretty = true;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  process.on('unhandledRejection', console.dir);

  app.use(morgan('dev'));

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
      message: err.message,
      error: err,
    });
  });

  app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
};
