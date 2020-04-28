const API_VERSION = 'v1';

const { logging, parameters } = require('../../middleware');
const { HistoryController } = require('../controller/');

module.exports = (app) => {
  app.post(
    `/api/${API_VERSION}/history/:type`,
    [parameters.getParameters],
    HistoryController.register,
  );
  app.get(
    `/api/${API_VERSION}/history/:type/aggregate`,
    [parameters.getParameters],
    HistoryController.aggregate,
  );
  app.get(
    `/api/${API_VERSION}/history/:type/random`,
    [parameters.getParameters],
    HistoryController.random,
  );
};
