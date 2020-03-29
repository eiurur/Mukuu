module.exports = app => {
  require('./history')(app);
  require('./posts')(app);
  require('./users')(app);
};
