const express = require('express');

const UserController = require('../controllers/users.controller');

const router = express.Router();

// Get all users
router.get('',
  UserController.getUsers);

// 
router.get('/login', UserController.loginUser);

router.get('/signup', UserController.createUser);

module.exports = router;
