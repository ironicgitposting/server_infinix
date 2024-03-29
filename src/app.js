const express = require("express");
const helmet = require("helmet");
// Routes
const userRoutes = require("./routes/users.route");
const mailRoutes = require("./routes/mails.route");
const vehiculeRoutes = require("./routes/vehicules.route");
const bookingRoutes = require("./routes/booking.route");
const siteRoutes = require("./routes/sites.route");
const StatusRoutes = require("./routes/status.route");
const settingRoutes = require("./routes/settings.route");
const SinisterRoutes = require("./routes/sinisters.route");

// Middlewares
const corsMW = require("./middleware/cors");

// Jobs
const initJobs = require("./jobs/");

const app = express();

const API_VERSION = "/api/v1";

// Middlewares
app.use(
  corsMW({
    allowedMethods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// OWASP optimization
app.use(helmet());

app.get(`${API_VERSION}/`, (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

// Launch Jobs
initJobs();

// Activated routes
app.use(`${API_VERSION}/users`, userRoutes);
app.use(`${API_VERSION}/mails`, mailRoutes);
app.use(`${API_VERSION}/vehicules`, vehiculeRoutes);
app.use(`${API_VERSION}/booking`, bookingRoutes);
app.use(`${API_VERSION}/sites`, siteRoutes);
app.use(`${API_VERSION}/status`, StatusRoutes);
app.use(`${API_VERSION}/settings`, settingRoutes);
app.use(`${API_VERSION}/sinisters`, SinisterRoutes);

module.exports = app;
