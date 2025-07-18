const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/register', upload, register);
router.post('/login', login);
router.post('/logout', logout)

module.exports = router;



