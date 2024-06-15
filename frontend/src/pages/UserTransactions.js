import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/transactions/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div>
      <h2>Personal Transaction History</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id}>
            {transaction.book.title} - Due Date: {new Date(transaction.dueDate).toLocaleDateString()} - Status: {transaction.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTransactions;
