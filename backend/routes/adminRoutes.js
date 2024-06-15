const express = require('express');
const { addAdmin, getAllAdmins } = require('../controllers/adminController');
const { verifyToken } = require('../controllers/authController');

const router = express.Router();

// Protected route: Add admin (requires authentication)
router.post('/', verifyToken, addAdmin);

// Protected route: Get all admins (requires authentication)
router.get('/', verifyToken, getAllAdmins);

module.exports = router;
