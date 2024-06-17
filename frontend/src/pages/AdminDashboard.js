import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
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
      console.log(response.data); 
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users'); 
      setUsers(response.data);
      console.log(response.data); 
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
      await axios.post(
        'http://localhost:5000/api/transactions/issue',
        {
          userId: selectedUser,
          bookId: selectedBook,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Book issued successfully');
      fetchBooks(); 
    } catch (error) {
      console.error('Error issuing book:', error);
      alert('Failed to issue book');
    }
  };

  const removeBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Book removed successfully');
      fetchBooks(); 
    } catch (error) {
      console.error('Error removing book:', error);
      alert('Failed to remove book');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>
      <Row>
        <Col md={6}>
          <h3>Issue Book</h3>
          <Form>
            <Form.Group controlId="formUser" className="mb-3">
              <Form.Label>Select User</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBook" className="mb-3">
              <Form.Label>Select Book</Form.Label>
              <Form.Control
                as="select"
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
              >
                <option value="">Select Book</option>
                {books.map(book => (
                  <option key={book._id} value={book._id}>
                    {book.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={issueBook} className="w-100 mt-4">
              Issue Book
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h3>Available Books</h3>
          <ListGroup>
            {books.map(book => (
              <ListGroup.Item key={book._id} className="d-flex justify-content-between align-items-center">
                <div>
                  {book.name} - {book.author}
                </div>
                <Button variant="danger" size="sm" onClick={() => removeBook(book._id)}>
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="link" as={Link} to="/manage-books" className="mt-3">
            Manage Books
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
