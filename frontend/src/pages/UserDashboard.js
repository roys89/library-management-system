import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchAvailableBooks();
  }, []);

  const fetchAvailableBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/available');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching available books:', error);
    }
  };

  return (
    <Container>
      <h2 className="my-4">User Dashboard</h2>
      <h3>Available Books</h3>
      <Row>
        <Col>
          <ListGroup>
            {books.map(book => (
              <ListGroup.Item key={book._id}>
                {book.title} - {book.author}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="link" as={Link} to="/transactions" className="mt-3">
            View Personal Transaction History
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
