const express = require('express');
const bodyParser = require('body-parser');

const corsMiddleware = require('./middlewares/cors/cors.middleware');
const db = require('./models');

const app = express();

const API_VERSION = '/api/v1';

// Middlewares
app.use(corsMiddleware({
  allowedMethods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get(`${API_VERSION}/`, async (req, res) => {
  // Database querying example
  const users = await db.sequelize.models.User.findAll();
  console.log(users);
  res.send('Hello World!');
});

// Launch Jobs

// Activated routes

module.exports = app;
