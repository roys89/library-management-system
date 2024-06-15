const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  dueDate: { type: Date, required: true },
  type: { type: String, enum: ['borrowed', 'returned'], required: true },
  issuedBy: { type: Schema.Types.ObjectId, ref: 'Admin' }, // If you track who issued the book
  returnedBy: { type: Schema.Types.ObjectId, ref: 'Admin' }, // If you track who returned the book
  createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
