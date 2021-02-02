const express = require('express');

const UserController = require('../controllers/users.controller');

const router = express.Router();

// Get all users
router.get('',
  UserController.getUsers);

module.exports = router;
