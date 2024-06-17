const express = require('express');
const { issueBook, returnBook, getUserTransactions } = require('../controllers/transactionController');
const { verifyToken } = require('../controllers/authController');

const router = express.Router();

// Issue a book
router.post('/issue', verifyToken, issueBook);

// Return a book
router.post('/return', verifyToken, returnBook);

// Get transactions for a user
router.get('/user', verifyToken, getUserTransactions);

module.exports = router;
