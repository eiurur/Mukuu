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

const tweetJob = new CronJob({
  // cronTime: '* * * * *',
  cronTime: '0 0,18,20,21 * * *',
  onTick: async () => {
    logger.info('--- start tweet cron ---');
    await Promise.all([
      runProcess(path.resolve(__dirname, 'tweet', 'tweetCrawling')),
    ]);
    logger.info('--- finish tweet cron ---');
  },
  start: true,
  timeZone: 'Asia/Tokyo',
});
const userJob = new CronJob({
  // cronTime: '* * * * *',
  cronTime: '0 6 * * *',
  onTick: async () => {
    logger.info('--- start user cron ---');
    await Promise.all([
      runProcess(path.resolve(__dirname, 'tweet', 'userCrawling')),
    ]);
    logger.info('--- finish user cron ---');
  },
  start: true,
  timeZone: 'Asia/Tokyo',
});
const databaseJob = new CronJob({
  // cronTime: '* * * * *',
  cronTime: '0 23 * * *',
  onTick: async () => {
    logger.info('--- start database cron ---');
    await Promise.all([
      runProcess(path.resolve(__dirname, 'database', 'updateDatabase.js')),
    ]);
    logger.info('--- finish database cron ---');
  },
  start: true,
  timeZone: 'Asia/Tokyo',
});

tweetJob.start();
userJob.start();
databaseJob.start();
