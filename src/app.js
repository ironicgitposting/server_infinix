const express = require('express');
const bodyParser = require('body-parser');

const corsMiddleware = require('./middlewares/cors/cors.middleware');
const userRoutes = require('./routes/users.route');

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

app.get('', (req, res) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

// Launch Jobs

// Activated routes
app.use(`${API_VERSION}/users`, userRoutes);

module.exports = app;
