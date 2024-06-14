import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchIssuedBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchIssuedBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions/user', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setIssuedBooks(response.data);
    } catch (error) {
      console.error('Error fetching issued books:', error);
    }
  };

  const issueBook = async (bookId) => {
    try {
      await axios.post('http://localhost:5000/api/transactions/issue', { bookId }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      fetchIssuedBooks();
    } catch (error) {
      console.error('Error issuing book:', error);
    }
  };

  const returnBook = async (transactionId) => {
    try {
      await axios.post('http://localhost:5000/api/transactions/return', { transactionId }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      fetchIssuedBooks();
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <h3>Available Books</h3>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} - {book.author}
            <button onClick={() => issueBook(book._id)}>Issue</button>
          </li>
        ))}
      </ul>
      <h3>Issued Books</h3>
      <ul>
        {issuedBooks.map(transaction => (
          <li key={transaction._id}>
            {transaction.book.title}
            <button onClick={() => returnBook(transaction._id)}>Return</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
