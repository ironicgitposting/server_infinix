const db = require("../models");

// Les Entités qu'on importe
const { Status } = db.sequelize.models;

// Get all status
exports.getStatus = async (req, res) => {
  try {
    const status = await Status.findAll();
    res.status(200).json({
      status,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
