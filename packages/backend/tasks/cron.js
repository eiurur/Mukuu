const path = require('path');
const CronJob = require('cron').CronJob;
const { promisify } = require('util');
const { execFile } = require('child_process');
const execFileAsync = promisify(execFile);
const logger = require(path.join('..', 'logger'))('cron');

const runProcess = async filepath => {
  const { stdout, stderr } = await execFileAsync('node', [filepath], {
    maxBuffer: 1024 * 1024 * 10,
    shell: true,
  });
  if (stderr) {
    logger.info(stderr);
  }
  logger.info(stdout);
  return stdout;
};

const workerJob = new CronJob({
  // cronTime: '* * * * *',
  cronTime: '0 0,6,9,12,15,18,21 * * *',
  onTick: async () => {
    logger.info('--- start cron ---');
    await Promise.all([
      runProcess(path.resolve(__dirname, 'tweet', 'tweetCrawling')),
      runProcess(path.resolve(__dirname, 'database', 'updateDatabase')),
    ]);
    logger.info('--- finish cron ---');
  },
  start: true,
  timeZone: 'Asia/Tokyo',
});
workerJob.start();
