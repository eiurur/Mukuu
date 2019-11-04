const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const createListener = require('./express');
const numCPUs = require('os').cpus().length;
const { logger } = require(path.resolve('logger'));

/**
 * Application
 */
const listener = createListener();

/**
 * routes, session
 */
require('./routes/api')(listener);
require('./routes/routes')(listener);

/**
 * Server
 */
const { createServer } = require('http');
createServer(listener).listen(listener.get('port'), () => {
  logger.info(`Express HTTS server listening on port ${listener.get('port')}`);
});
