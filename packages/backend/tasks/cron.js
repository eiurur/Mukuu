const path = require('path');
const CronJob = require('cron').CronJob;
const { promisify } = require('util');
const { execFile } = require('child_process');

const workerJob = new CronJob({
  // cronTime: '* * * * *',
  cronTime: '0 0,6,12,18 * * *',
  onTick: async () => {
    console.log('--- start cron ---');
    await promisify(execFile)('node', [
      path.resolve(__dirname, 'tweetCrawling'),
    ]);
  },
  start: true,
  timeZone: 'Asia/Tokyo',
});
workerJob.start();
