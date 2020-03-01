const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const logger = require(path.resolve('logger'))();

module.exports = app => {
  app.locals.pretty = false;

  // Logging (access)
  const FileStreamRotator = require('file-stream-rotator');
  const ACCESS_LOG_DIRECTORY = path.resolve('logs', 'accesslog');

  // ensure log directory exists
  fs.existsSync(ACCESS_LOG_DIRECTORY) || fs.mkdirSync(ACCESS_LOG_DIRECTORY);

  // create a rotating write stream
  const accessLogStream = FileStreamRotator.getStream({
    filename: `${ACCESS_LOG_DIRECTORY}/access-%DATE%.log`,
    frequency: 'daily',
    verbose: false,
    date_format: 'YYYY-MM-DD',
  });

  // setup the logger
  app.use(morgan('combined', { stream: accessLogStream }));
  // logger.info(process.env);

  const cacheOptions = {
    dotfiles: 'ignore',
    etag: true,
    extensions: ['css', 'js', 'jpg', 'png', 'gif', 'webp', 'webm', 'mp4'],
    index: false,
    maxAge: 0,
    redirect: false,
    setHeaders(res, path, stat) {
      res.set({ 'x-timestamp': Date.now() });
    },
  };

  app.use(
    express.static(
      path.join(__dirname, '..', '..', 'frontend', 'dist'),
      cacheOptions,
    ),
  );
};
