const path = require('path');
const { spawnProcess, makeJob } = require('./util');

const SCHEDULES = {
  SEARCH_CRAWLER: '0 5,21 * * *',
  USER_CRAWLER: '0 6,19,23 * * *',
  REMOVE_POSTS: '30 11 * * *',
  UPDATE_USER_DATABASE: '35 11 * * *',
};

[
  {
    jobName: 'search',
    cronTime: SCHEDULES.SEARCH_CRAWLER,
    args: [path.resolve(__dirname, 'crawler', 'tweet', 'searchCrawling')],
  },
  {
    jobName: 'user',
    cronTime: SCHEDULES.USER_CRAWLER,
    args: [path.resolve(__dirname, 'crawler', 'tweet', 'dailyUserCrawling')],
  },
  {
    jobName: 'remove',
    cronTime: SCHEDULES.REMOVE_POSTS,
    args: [path.resolve(__dirname, 'database', 'removeUntargets')],
  },
  {
    jobName: 'update',
    cronTime: SCHEDULES.UPDATE_USER_DATABASE,
    args: [path.resolve(__dirname, 'database', 'updateUserDatabase')],
  },
]
  .map(({ jobName, cronTime, args }) => makeJob({ jobName, cronTime, args }))
  .forEach((job) => job.start());

// NOTE: cronだと動かない
(async () => {
  const args = [path.resolve(__dirname, 'database', 'updateReplyStatus')];
  const stdout = await spawnProcess('node', args);
})();
(async () => {
  const args = [path.resolve(__dirname, 'database', 'updateQuotedStatus')];
  const stdout = await spawnProcess('node', args);
})();
