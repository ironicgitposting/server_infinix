const express = require('express');

const MailController = require('../controllers/mails.controller');

const router = express.Router();

// Mail user
router.get('/mail/:mail', MailController.mailUser);

module.exports = router;
