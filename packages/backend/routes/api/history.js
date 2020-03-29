const API_VERSION = 'v1';

const { logging, parameters } = require('../../middleware');
const { HistoryController } = require('../controller/');

module.exports = app => {
  app.post(
    `/api/${API_VERSION}/history/:type`,
    [parameters.getParameters, logging.log],
    HistoryController.register,
  );
  app.get(
    `/api/${API_VERSION}/history/:type/list`,
    [parameters.getParameters, logging.log],
    HistoryController.query,
  );
};
