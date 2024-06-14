import axios from 'axios';
import React, { useState } from 'react';

const Admin = () => {
    const [admin, setAdmin] = useState({ username: '', name: '', password: '', email: '', contactNumber: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admins/add', admin);
            alert('Admin added successfully');
        } catch (error) {
            alert('Error adding admin');
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
                <button type="submit">Add Admin</button>
            </form>
        </div>
    );
};

export default Admin;
