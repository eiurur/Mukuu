const API_VERSION = 'v1';

const { logging, parameters } = require('../../middleware');
const { AddController } = require("../controller");

module.exports = (app) => {
  app.get(
    `/api/${API_VERSION}/adds`,
    [parameters.getParameters, logging.log],
    AddController.get,
  );
};
