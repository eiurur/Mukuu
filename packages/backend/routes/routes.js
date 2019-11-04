const path = require('path');
module.exports = app => {
  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'),
    );
  });
};
