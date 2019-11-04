process.on('unhandledRejection', console.dir);

const log4js = require('log4js');

log4js.configure(require('./log4js.setting.js'));

const logger = log4js.getLogger();

exports.logger = logger;
