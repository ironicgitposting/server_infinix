const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.route');

const app = express();

const API_VERSION = '/api/v1';

// Middlewares
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.get(`${API_VERSION}/`, (req, res) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

// Launch Jobs

// Activated routes
app.use(`${API_VERSION}/users`, userRoutes);

module.exports = app;
