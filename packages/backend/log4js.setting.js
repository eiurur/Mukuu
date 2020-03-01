const root = __dirname;

module.exports = {
  appenders: {
    stdout: { type: 'stdout' },
    stderr: { type: 'stderr' },
    logfile: {
      type: 'dateFile',
      pattern: 'yyyyMMdd.log',
      filename: `${root}/logs/apps/app`,
      alwaysIncludePattern: 'true',
    },
    cron: {
      type: 'dateFile',
      pattern: 'yyyyMMdd.log',
      filename: `${root}/logs/apps/cron`,
      alwaysIncludePattern: 'true',
    },
  },
  categories: {
    default: {
      appenders: ['stdout', 'logfile'],
      level: 'ALL',
    },
    cron: {
      appenders: ['stdout', 'cron'],
      level: 'ALL',
    },
    error: {
      appenders: ['stderr', 'logfile'],
      level: 'error',
    },
  },
};
