const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  console.log('Received API key:', apiKey); // Debugging line
  const validApiKey = process.env.API_KEY;
  console.log('Valid API key:', validApiKey); // Debugging line

  if (!apiKey) {
    return res.status(403).json({ message: 'API key is missing' });
  }

  if (apiKey !== validApiKey) {
    return res.status(403).json({ message: 'Invalid API key' });
  }

  next();
};

module.exports = apiKeyMiddleware;
