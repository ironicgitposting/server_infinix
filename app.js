const express = require('express');
const bodyParser = require('body-parser');

const {
  Pool,
} = require('pg');
require('dotenv').config();

const {
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
} = process.env;

const corsMiddleware = require('./src/middlewares/cors/cors.middleware');

const app = express();

const activeApiPath = '/api/v1';

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
