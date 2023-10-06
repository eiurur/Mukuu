const path = require('path');
const { spawnProcess, makeJob } = require('./util');

const SCHEDULES = {
  SEARCH_CRAWLER: '0 16,21 * * *',
  USER_CRAWLER: '5 0,18 * * *',
  REMOVE_POSTS: '30 4 * * *',
  UPDATE_USER_DATABASE: '35 5 * * *',
  UPDATE_HISTORY_CACHE: '0 0 * * *',
  // CHECK_OUT_OF_LINK: '45 4 * * 1'
};

[
  // {
  //   jobName: 'search',
  //   cronTime: SCHEDULES.SEARCH_CRAWLER,
  //   args: [path.resolve(__dirname, 'crawler', 'tweet', 'searchCrawling')],
  // },
  // {
  //   jobName: 'user',
  //   cronTime: SCHEDULES.USER_CRAWLER,
  //   args: [path.resolve(__dirname, 'crawler', 'tweet', 'dailyUserCrawling')],
  // },
  // {
  //   jobName: 'remove',
  //   cronTime: SCHEDULES.REMOVE_POSTS,
  //   args: [path.resolve(__dirname, 'database', 'removeUntargets')],
  // },
  // {
  //   jobName: 'update',
  //   cronTime: SCHEDULES.UPDATE_USER_DATABASE,
  //   args: [path.resolve(__dirname, 'database', 'updateUserDatabase')],
  // },
  {
    jobName: 'history',
    cronTime: SCHEDULES.UPDATE_HISTORY_CACHE,
    args: [path.resolve(__dirname, 'database', 'updateHistoryCache')],
  },
  // {
  //   jobName: 'checkOutOfLink',
  //   cronTime: SCHEDULES.CHECK_OUT_OF_LINK,
  //   args: [path.resolve(__dirname, 'database', 'checkOutOfLink')],
  // },
]
  .map(({ jobName, cronTime, args }) => makeJob({ jobName, cronTime, args }))
  .forEach((job) => job.start());

// NOTE: cronだと動かない
// (async () => {
//   const args = [path.resolve(__dirname, 'database', 'updateReplyStatus')];
//   const stdout = await spawnProcess('node', args);
// })();
// (async () => {
//   const args = [path.resolve(__dirname, 'database', 'updateQuotedStatus')];
//   const stdout = await spawnProcess('node', args);
// })();
