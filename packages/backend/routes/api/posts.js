const API_VERSION = 'v1';

const { logging, parameters } = require('../../middleware');
const { PostController } = require('../controller/');

module.exports = app => {
  app.get(
    `/api/${API_VERSION}/posts/count`,
    [parameters.getParameters, logging.log],
    PostController.count,
  );
  app.get(
    `/api/${API_VERSION}/posts/@:screenName`,
    [parameters.getParameters, logging.log],
    PostController.getByScreenName,
  );
  app.get(
    `/api/${API_VERSION}/posts`,
    [parameters.getParameters, logging.log],
    PostController.get,
  );
};
