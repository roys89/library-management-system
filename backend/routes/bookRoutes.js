const express = require('express');
const { addBook, getAllBooks, getAvailableBooks, removeBook } = require('../controllers/bookController');

const router = express.Router();

router.post('/', addBook);
router.get('/', getAllBooks);
router.get('/available', getAvailableBooks);
router.delete('/:id', removeBook);

module.exports = router;
