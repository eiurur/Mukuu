module.exports = app => {
  require('./posts')(app);
  require('./users')(app);
};
