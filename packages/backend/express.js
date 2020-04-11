const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const compression = require('compression');
const hostValidation = require('host-validation');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const env = process.env.NODE_ENV || 'development';

// application
module.exports = () => {
  const app = express();
  app.disable('x-powered-by');
  app.set('port', process.env.PORT);
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  app.use(methodOverride());
  app.use(compression({ level: 9 }));
  app.use(
    hostValidation({
      hosts: [
        '127.0.0.1:8100',
        'localhost:8100',
        '127.0.0.1:9100',
        'localhost:9100',
        'mukuu.herokuapp.com',
      ],
    }),
  );

  if (env === 'development') {
    require('./config/development')(app);
  }

  if (env === 'production') {
    require('./config/production')(app);
  }

  return app;
};
