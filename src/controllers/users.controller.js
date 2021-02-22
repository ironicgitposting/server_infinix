// DB Object
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const db = require('../models');

// Les Entités qu'on importe
const { User } = db.sequelize.models;

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
  const { name, surname, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      name,
      surname,
      email,
      password: hash,
    });

    await user.save();

    res.status(200).json({
      message: 'User created',
    });
  } catch (error) {
    return res.status(500)({
      message: error,
    });
  }
};

exports.loginUser = async (req, res) => {
  let fetchedUser;
  const { email, password } = req.body;
  User.findOne({
 where: {
 email,
},
})
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failure',
        });
      }
      fetchedUser = user;
      return bcrypt.compare(password, fetchedUser.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failure',
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser.id,
        },
        'my_secret_key',
        {
          expiresIn: '1h',
        },
      );
      return res.status(200).json({
        token,
        expiresIn: 3600,
      });
    })
    .catch((err) => res.status(401).json({
        message: 'Auth failure',
      }));
};
