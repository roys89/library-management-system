const express = require('express');
const { addBook, getAllBooks } = require('../controllers/bookController');

const router = express.Router();

router.post('/', addBook);
router.get('/', getAllBooks);

module.exports = router;
