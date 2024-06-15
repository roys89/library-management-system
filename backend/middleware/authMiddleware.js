const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path based on your project structure

const authMiddleware = async (req, res, next) => {
  try {
    // Check if Authorization header is present
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dsyIqJbYS1E7xPvV');
    
    // Fetch user from database based on decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user object to request for further use in routes
    req.user = user;
    next(); // Call next middleware or route handler
  } catch (error) {
    console.error('Error verifying token:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
