const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Add Admin
const addAdmin = async (req, res) => {
    const { username, name, password, email, contactNumber } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            username,
            name,
            password: hashedPassword,
            email,
            contactNumber
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding admin', error });
    }
};

// Get All Admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admins', error });
    }
};

module.exports = { addAdmin, getAllAdmins };
