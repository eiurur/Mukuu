const chalk = require('chalk');
const path = require('path');

const { logger } = require(path.resolve('logger'));

module.exports = {
  log(req, res, next) {
    if (req.query) {
      logger.info(chalk.bgCyan('req.query ====> '));
      logger.info(req.query);
    }
    if (req.params) {
      logger.info(chalk.bgBlue('req.params ====> '));
      logger.info(req.params);
    }
    if (req.body) {
      logger.info(chalk.bgMagenta('req.body ====> '));
      logger.info(req.body);
    }
    return next();
  },
};
