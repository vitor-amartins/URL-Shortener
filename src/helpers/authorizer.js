const authorizer = async (req, res, next) => {
  try {
    /**
     * Get token
     */
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ data: 'Missing token' });
    }

    if (token !== process.env.AUTHORIZATION_TOKEN) {
      return res.status(401).json({ data: 'Invalid token' });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = authorizer;
