// DB Object
const db = require('../models');

// Les Entités qu'on importe
const {
  User,
} = db.sequelize.models;

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.createUser = async (req, res) => {
  const {email, password}
};
