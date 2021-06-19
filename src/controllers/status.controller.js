const db = require("../models");

// Les Entités qu'on importe
const { Status } = db.sequelize.models;

// Get all status
exports.getStatusByFamilyStatus = async (req, res) => {
  const {
    familyStatus
  } = req.params;
  try {
    const status = await Status.findAll({
      where: {
        familyStatus
      }
    });
    res.status(200).json({
      status,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
