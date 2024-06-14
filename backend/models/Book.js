const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, required: true, default: 'available' }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
