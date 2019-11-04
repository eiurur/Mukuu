const parse = req => {
  return Object.assign({}, req.query, req.params, req.body);
};
module.exports = {
  getParameters(req, res, next) {
    req.params = parse(req);
    return next();
  },
};
