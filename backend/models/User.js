const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
