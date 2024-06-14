const express = require('express');
const { register, login, registerAdmin, loginAdmin } = require('../controllers/authController');

const router = express.Router();

// Register user
router.post('/register', register);

// Login user
router.post('/login', login);

// Register admin
router.post('/admin/register', registerAdmin);

// Login admin
router.post('/admin/login', loginAdmin);

module.exports = router;
