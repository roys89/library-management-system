import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
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
          </li>
        ))}
      </ul>
      <Link to="/transactions">View Personal Transaction History</Link>
    </div>
  );
};

export default UserDashboard;
