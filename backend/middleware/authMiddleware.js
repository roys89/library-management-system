const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  console.log('Received Token:', token); // Debug log

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dsyIqJbYS1E7xPvV');
    console.log('Decoded Token:', decoded); // Debug log
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message); // Debug log
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
