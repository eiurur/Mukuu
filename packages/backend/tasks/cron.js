const path = require('path');
const CronJob = require('cron').CronJob;
const { promisify } = require('util');
const { execFile, spawn } = require('child_process');
const execFileAsync = promisify(execFile);
const logger = require(path.join('..', 'logger'))('cron');

const runProcess = async (filepath) => {
  const { stdout, stderr } = await execFileAsync('node', [filepath], {
    maxBuffer: 1024 * 1024 * 100,
    shell: true,
  });
  if (stderr) {
    logger.info(stderr);
  }
  logger.info(stdout);
  return stdout;
};

const spawnProcess = (cmd, args = [], option = {}) => {
  return new Promise((resolve, reject) => {
    const normalizedCmd = cmd.replace(/\\/g, '/');
    const normalizedArgs = args.map((arg) => arg.replace(/\\/g, '/'));
    let stdoutChunks = [];
    let stderrChunks = [];
    const child = spawn(normalizedCmd, normalizedArgs);
    child.stdout.on('data', (data) => {
      stdoutChunks = stdoutChunks.concat(data);
    });
    child.stdout.on('end', () => {
      const stdoutContent = Buffer.concat(stdoutChunks).toString();
      logger.info('stdout chars:', stdoutContent.length);
      logger.info(stdoutContent);
      return resolve(stdoutContent);
    });

    child.stderr.on('data', (data) => {
      stderrChunks = stderrChunks.concat(data);
    });
    child.stderr.on('end', () => {
      const stderrContent = Buffer.concat(stderrChunks).toString();
      logger.info('stderr chars:', stderrContent.length);
      logger.info(stderrContent);
      return reject(stderrContent);
    });
  });
};

const searchCrawlerJob = new CronJob({
  // cronTime: '* * * * *',
  cronTime: '0 1,9,12,15,18,20,22 * * *',
  onTick: async () => {
    logger.info('--- start search cron ---');
    const args = [
      path.resolve(__dirname, 'crawler', 'tweet', 'searchCrawling'),
    ];
    const stdout = await spawnProcess('node', args);
    logger.info('--- finish search cron ---');
  },
  start: true,
  timeZone: 'Asia/Tokyo',
});
const userCrawlerJob = new CronJob({
  // cronTime: '* * * * *',
  cronTime: '0 0,11,21 * * *',
  onTick: async () => {
    logger.info('--- start user cron ---');
    const args = [
      path.resolve(__dirname, 'crawler', 'tweet', 'dailyUserCrawling'),
    ];
    const stdout = await spawnProcess('node', args);
    logger.info('--- finish user cron ---');
  },
  start: true,
  timeZone: 'Asia/Tokyo',
});
const removeJob = new CronJob({
  // cronTime: '* * * * *',
  cronTime: '30 0,3,19,22 * * *',
  onTick: async () => {
    logger.info('--- start remove cron ---');
    const args = [path.resolve(__dirname, 'database', 'removeUntargets')];
    const stdout = await spawnProcess('node', args);
    logger.info('--- finish remove cron ---');
  },
  start: true,
  timeZone: 'Asia/Tokyo',
});
const userJob = new CronJob({
  // cronTime: '* * * * *',
  cronTime: '35 2,12,23 * * *',
  onTick: async () => {
    logger.info('--- start user cron ---');
    const args = [path.resolve(__dirname, 'database', 'updateUserDatabase')];
    const stdout = await spawnProcess('node', args);
    logger.info('--- finish user cron ---');
  },
  start: true,
  timeZone: 'Asia/Tokyo',
});

searchCrawlerJob.start();
userCrawlerJob.start();
removeJob.start();
userJob.start();
