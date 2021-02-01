const express = require('express');
const bodyParser = require('body-parser');

const corsMiddleware = require('./middlewares/cors/cors.middleware');
// DB Object
const db = require('./models');

// Les Entités qu'on importe
const {
  User,
} = db.sequelize.models;

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
  const user = await User.findOne({
    firstName: 'Kobe',
  });
  try {
    await user.update({
      email: 'bryant@blackmanba.com',
    });
  } catch (err) {
    console.log(err);
  }
  res.send(user);
});

// Launch Jobs

// Activated routes

module.exports = app;
