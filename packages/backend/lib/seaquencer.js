const path = require('path');
const { logger } = require(path.resolve('logger'));
// const SlackLogger = require(path.resolve('lib', 'utils', 'SlackLogger'));

exports.seaquencer = (req, res, resolver) => {
  const onResp = resp => {
    if (resp !== null) {
      return res.status(200).send(resp);
    }
    return res.status(400).send('Bad Request');
  };

  const onError = e => {
    logger.error('seq onError statusCode =>  ', e.statusCode);
    logger.error('seq onError message =>  ', e.message);
    logger.error('seq onError trace=>  ', e.stack);
    const statusCode = e.response ? e.response.status : e.statusCode;
    const message = e.response ? e.response.data : e.message;
    return res.status(statusCode).send(message);
  };

  return resolver.then(onResp).catch(onError);
};
