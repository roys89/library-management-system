const Transaction = require('../models/Transaction');

// Issue Book
const issueBook = async (req, res) => {
    const { userId, bookId, dueDate } = req.body;

    try {
        const newTransaction = new Transaction({
            user: userId,
            book: bookId,
            dueDate,
            type: 'borrowed'
        });

        await newTransaction.save();
        res.status(201).json({ message: 'Book issued successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error issuing book', error });
    }
};

// Return Book
const returnBook = async (req, res) => {
    const { transactionId } = req.body;

    try {
        await Transaction.findByIdAndUpdate(transactionId, { type: 'returned' });
        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error returning book', error });
    }
};

// Get All Transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('user').populate('book');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
};

module.exports = { issueBook, returnBook, getAllTransactions };
