const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const User = require('../models/User');

// Issue Book
const issueBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const transaction = new Transaction({
      user: userId,
      book: bookId,
      type: 'borrowed',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) 
    });

    await transaction.save();
    book.status = 'borrowed';
    await book.save();

    res.status(201).json({ message: 'Book issued successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error issuing book', error });
  }
};

// Return Book
const returnBook = async (req, res) => {
  const { transactionId } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId).populate('book');
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.type = 'returned';
    transaction.book.status = 'available';

    await transaction.save();
    await transaction.book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error returning book', error });
  }
};

// Get User Transactions
const getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.id; 
    console.log('User ID:', userId); // Debug log
    const transactions = await Transaction.find({ user: userId }).populate('book').populate('user');

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

module.exports = { issueBook, returnBook, getUserTransactions };
