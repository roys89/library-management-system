const Book = require('../models/Book');

// Add Book
const addBook = async (req, res) => {
  const { name, author, status } = req.body;

  try {
    const newBook = new Book({
      name,
      author,
      status
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
};

// Get All Books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// Remove Book
const removeBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing book', error });
  }
};

module.exports = { addBook, getAllBooks, removeBook };
