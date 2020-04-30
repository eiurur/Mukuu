const API_VERSION = 'v1';

const { logging, parameters } = require('../../middleware');
const { PostController } = require('../controller/');

module.exports = (app) => {
  app.post(
    `/api/${API_VERSION}/posts/count`,
    [parameters.getParameters, logging.log],
    PostController.count,
  );
  app.get(
    `/api/${API_VERSION}/posts/@:screenName`,
    [parameters.getParameters, logging.log],
    PostController.queryByScreenName,
  );
  app.post(
    `/api/${API_VERSION}/posts/list`,
    [parameters.getParameters, logging.log],
    PostController.query,
  );
  app.post(
    `/api/${API_VERSION}/posts/register`,
    [parameters.getParameters, logging.log],
    PostController.register,
  );
  app.post(
    `/api/${API_VERSION}/posts/aggregate`,
    [parameters.getParameters, logging.log],
    PostController.aggregate,
  );
};
