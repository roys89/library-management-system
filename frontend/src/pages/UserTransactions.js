import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, ListGroup, Row } from 'react-bootstrap';

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
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="my-4 text-center">Personal Transaction History</h2>
          {transactions.length > 0 ? (
            <ListGroup>
              {transactions.map(transaction => (
                <ListGroup.Item key={transaction._id}>
                  <strong>{transaction.book.title}</strong> - Due Date: {new Date(transaction.dueDate).toLocaleDateString()} - Status: {transaction.type}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Alert variant="info" className="text-center">
              No transactions found.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserTransactions;
