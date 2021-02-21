// DB Object
const db = require('../models');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

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
  const {name, surname, email, password} = req.body;
  const hash = await bcrypt.hash(password, 10);


  try {
    const user = new User({name, surname, email, password:hash});
    //const user = await User.create({​​ name: "Jane" }​​);
    await user.save();

    res.status(200).json({
      message: 'User created'
    });
  } catch (error) {
    return res.status(500)({
      message: error
    })
  }
  
};

