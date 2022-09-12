module.exports = app => {
  require('./adds')(app);
  require('./history')(app);
  require('./posts')(app);
  require('./users')(app);
};
