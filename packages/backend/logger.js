process.on('unhandledRejection', console.dir);

const log4js = require('log4js');

log4js.configure(require('./log4js.setting.js'));

module.exports = (type) => {
  const logger = log4js.getLogger(type || '');
  logger.level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
  return logger;
};
