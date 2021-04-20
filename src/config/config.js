// Sequelize Config
require("dotenv").config();

// For production we need to add SSL and configure and follow instructions found here:
// https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
const {
  DB_HOST,
  DB_USERNAME = "postgres",
  DB_PASSWORD = "postgres",
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "infinix_database_development",
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "infinix_database_test",
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "infinix_database_production",
    host: DB_HOST,
    dialect: "postgres",
  },
};
