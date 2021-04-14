require('newrelic');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const createListener = require('./express');
const { createServer } = require('http');
const logger = require(path.resolve('logger'))();

/**
 * Application
 */
const listener = createListener();

/**
 * routes, session
 */
require('./routes/api/')(listener);
require('./routes/routes')(listener);

/**
 * Server
 */
createServer(listener).listen(listener.get('port'), () => {
  logger.info(`Express HTTS server listening on port ${listener.get('port')}`);
});
