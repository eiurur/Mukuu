const API_VERSION = 'v1';

const { logging, parameters } = require('../../middleware');
const { UserController } = require('../controller/');

module.exports = app => {
  app.get(
    `/api/${API_VERSION}/users/count`,
    [parameters.getParameters, logging.log],
    UserController.count,
  );
  app.get(
    `/api/${API_VERSION}/users/:screenName`,
    [parameters.getParameters, logging.log],
    UserController.getByScreenName,
  );

  app.get(
    `/api/${API_VERSION}/users`,
    [parameters.getParameters, logging.log],
    UserController.get,
  );
};
