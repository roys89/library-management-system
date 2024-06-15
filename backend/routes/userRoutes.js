const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');
const { verifyToken } = require('../controllers/authController');

const router = express.Router();

// Public route: Get all users (accessible without authentication)
router.get('/', getAllUsers);

// Protected route: Get user by ID (requires authentication)
router.get('/:id', verifyToken, getUserById);

module.exports = router;
