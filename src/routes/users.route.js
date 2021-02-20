const express = require('express');

const UserController = require('../controllers/users.controller');

const router = express.Router();

// Get all users
router.get('', UserController.getUsers);

//
//router.post('/login', UserController.loginUser);

router.post('/signup', UserController.createUser);

module.exports = router;
