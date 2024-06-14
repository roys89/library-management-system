// src/pages/UserTransactions.js
import React from 'react';

const UserTransactions = ({ transactions }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id}>
            Book: {transaction.bookTitle}, Date: {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTransactions;
