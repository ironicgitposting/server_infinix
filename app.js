const express = require('express');
const bodyParser = require('body-parser');

const corsMiddleware = require('./middlewares/cors/cors.middleware');

const app = express();

const activeApiPath = '/api/v1';
// Connect DB

// Middlewares
app.use(corsMiddleware({
  allowedMethods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Launch Jobs

// Activated routes
// app.use(`${activeApiPath}/user`, userRoutes);

module.exports = app;
