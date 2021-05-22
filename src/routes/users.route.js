const express = require('express');

const UserController = require('../controllers/users.controller');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

// Get all users
router.get( '', checkAuth, UserController.getUsers);

// Login
router.post('/login', UserController.loginUser);

// Create an user
router.post('/signup', UserController.createUser);

// Update user
router.put('/update/:email', checkAuth, UserController.updateUser);

// Delete user
router.post('/delete/:email', checkAuth, UserController.deleteUser);


module.exports = router;
