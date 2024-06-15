import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users'); // Assuming you have an endpoint to get users
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const issueBook = async () => {
    if (!selectedUser || !selectedBook) {
      alert('Please select a user and a book');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/transactions/issue', {
        userId: selectedUser,
        bookId: selectedBook,
      });
      alert('Book issued successfully');
      fetchBooks(); // Update the books list to reflect changes
    } catch (error) {
      console.error('Error issuing book:', error);
      alert('Failed to issue book');
    }
  };

  const removeBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      alert('Book removed successfully');
      fetchBooks(); // Update the books list to reflect changes
    } catch (error) {
      console.error('Error removing book:', error);
      alert('Failed to remove book');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Link to="/add-book">Add Book</Link>

      <h3>Issue Book</h3>
      <div>
        <label>Select User</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Book</label>
        <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
          <option value="">Select a book</option>
          {books.map(book => (
            <option key={book._id} value={book._id}>{book.title}</option>
          ))}
        </select>
      </div>
      <button onClick={issueBook}>Issue Book</button>

      <h3>Available Books</h3>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} - {book.author}
            <button onClick={() => removeBook(book._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
