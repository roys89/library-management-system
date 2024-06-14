const express = require('express');
const { addAdmin, getAllAdmins } = require('../controllers/adminController');

const router = express.Router();

router.post('/', addAdmin);
router.get('/', getAllAdmins);

module.exports = router;
