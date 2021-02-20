const path = require('path');
const CronJob = require('cron').CronJob;
const getUrls = require('get-urls');
const { promisify } = require('util');
const { execFile, spawn } = require('child_process');
const execFileAsync = promisify(execFile);
const logger = require(path.join('..', 'logger'))('cron');

const ModelProviderFactory = require('../models/modelProviderFactory');
const { acceptedDomains } = require('@mukuu/common/lib/constants');

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

module.exports = {
  addReplyStatus: async (post) => {
    if (!post) return;
    post.isReply = post.text.startsWith('@');
    const entity = {
      query: { idStr: post.idStr },
      data: post,
      options: { new: true, upsert: true },
    };
    const postProvider = ModelProviderFactory.create('post');
    const dbPost = await postProvider.findOneAndUpdate(
      entity.query,
      entity.data,
      entity.options
    );
    return dbPost;
  },
  addQuoteStatus: async (post) => {
    if (!post) return;
    // if (post.quotedStatus) return;

    const entities = JSON.parse(post.entities);
    if (entities.media && entities.media.length) return; // 本ツイートのメディアの表示を優先する

    const urls = [...post.text.matchAll(/(https?:\/\/\S+)/g)];
    if (!urls || !urls.length) return;

    const matchedDlLinks = urls.filter((m) =>
      acceptedDomains.some((domain) => m[0].indexOf(domain) !== -1)
    );
    if (!matchedDlLinks.length) return;

    const postProvider = ModelProviderFactory.create('post');

    const quotedStatuses = [];
    for ([dlLink] of matchedDlLinks) {
      if (
        dlLink.indexOf('ux.getuploader.com') !== -1 &&
        dlLink.indexOf('/download/') === -1
      ) {
        continue;
      }
      const postQuery = { searchWord: dlLink };
      const postSearchOption = {
        sort: 'createdAtAsc',
      };
      const [oldest] = await postProvider.find(postQuery, postSearchOption);
      if (oldest && post.idStr !== oldest.idStr) {
        const urls = getUrls(oldest.text);
        const isExactMatch = Array.from(urls).includes(dlLink);
        if (!isExactMatch) continue;
        quotedStatuses.push(oldest);
      }
    }
    if (!quotedStatuses.length) return;

    const entity = {
      query: { idStr: post.idStr },
      data: Object.assign(post, {
        quotedStatuses: quotedStatuses.map((post) => post._id),
      }),
      options: { new: true, upsert: true },
    };
    const dbPost = await postProvider.findOneAndUpdate(
      entity.query,
      entity.data,
      entity.options
    );
  },
  runProcess: async (filepath) => {
    const { stdout, stderr } = await execFileAsync('node', [filepath], {
      maxBuffer: 1024 * 1024 * 10 * 100,
      shell: true,
    });
    if (stderr) {
      logger.info(stderr);
    }
    logger.info(stdout);
    return stdout;
  },
  spawnProcess,
  makeJob: ({ jobName, cronTime, args }) => {
    return new CronJob({
      cronTime,
      onTick: async () => {
        logger.info(`--- start ${jobName} cron ---`);
        const stdout = await spawnProcess('node', args);
        logger.info(`--- finish ${jobName} cron ---`);
      },
      start: true,
      timeZone: 'Asia/Tokyo',
    });
  },
};
