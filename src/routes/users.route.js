const express = require('express');

const UserController = require('../controllers/users.controller');

const router = express.Router();

// Get all users
router.get('', UserController.getUsers);

// Login
router.post('/login', UserController.loginUser);

// Create an user
router.post('/signup', UserController.createUser);

module.exports = router;
