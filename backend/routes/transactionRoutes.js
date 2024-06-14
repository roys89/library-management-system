const express = require('express');
const { issueBook, returnBook, getAllTransactions } = require('../controllers/transactionController');

const router = express.Router();

router.post('/issue', issueBook);
router.post('/return', returnBook);
router.get('/', getAllTransactions);

module.exports = router;
