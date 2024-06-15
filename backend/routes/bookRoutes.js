const express = require('express');
const { addBook, getAllBooks, removeBook } = require('../controllers/bookController');

const router = express.Router();

router.post('/', addBook);
router.get('/', getAllBooks);
router.delete('/:id', removeBook);

module.exports = router;
