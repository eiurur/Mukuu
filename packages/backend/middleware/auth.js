module.exports = {
  checkApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    const expectedApiKey = process.env.API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: 'API key is missing' });
    }

    if (apiKey !== expectedApiKey) {
      return res.status(400).json({ error: 'Invalid API key' });
    }

    return next();
  },
};