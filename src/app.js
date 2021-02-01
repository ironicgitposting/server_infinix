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

const corsMiddleware = require('./middlewares/cors/cors.middleware');

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

app.get(`${API_VERSION}/`, (req, res) => {
  res.send('Hello World!');
});

// Launch Jobs

// Activated routes

module.exports = app;
