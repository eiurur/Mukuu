const path = require('path');
const CronJob = require('cron').CronJob;
const { promisify } = require('util');
const { execFile } = require('child_process');
const execFileAsync = promisify(execFile);

const runProcess = async filepath => {
  await execFileAsync('node', [filepath], {
    maxBuffer: 1024 * 1024 * 10,
  });
};

const workerJob = new CronJob({
  // cronTime: '* * * * *',
  cronTime: '0 0,6,9,12,15,18,21 * * *',
  onTick: async () => {
    console.log('--- start cron ---');
    await runProcess(path.resolve(__dirname, 'tweet', 'tweetCrawling'));
    await runProcess(path.resolve(__dirname, 'database', 'updateDatabase'));
    console.log('--- end cron ---');
  },
  start: true,
  timeZone: 'Asia/Tokyo',
});
workerJob.start();
