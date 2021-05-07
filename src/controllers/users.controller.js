// DB Object
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const db = require("../models");
const MailController = require("./mails.controller");

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
  const {
    registrationNumber,
    surname,
    name,
    profession,
    password,
    email,
    telephone,
    authorizationAccess,
    dateLastSeen,
    site,
    language,
    archived,
    archivedDate,
  } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      name,
      surname,
      profession,
      password: hash,
      email,
      telephone,
      site,
      language,
      archived,
      archivedDate,
    });

    // User must be activated manually by an admin
    user.enabled = false;
    await user.save();

    MailController.sendMailUserCreationRequest(user);

    console.log("test allo");

    res.status(200).json({
      message: "User created",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { email } = req.params;
  const propsToUpdate = { ...req.body };
  const user = await User.findOne({where: {email}});
  if (!user) {
    throw Error(`User not updated. email: ${email}`);
  }

  for (const prop in propsToUpdate) {
    user[prop] = propsToUpdate[prop];
  }

  try {
    const propsUpdated = user.changed();
    const userUpdated = await user.save();

    if (propsUpdated.includes("enabled") && userUpdated.enabled) {
      console.log("User activated: " + userUpdated.email);
      console.log("User activated: " + userUpdated.enabled)
      // Mail d'activation ici
      // MailController
    }
    res.status(200).json({
      message: "User updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { email } = req.params;

  User.destroy({
    where: {
      email,
    },
  })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: "User was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete user with email= ${email}, maybe it wasn'nt found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete user with email : ${email}`,
      });
    });
};

exports.loginUser = async (req, res) => {
  let fetchedUser;
  const { email, password } = req.body;
  User.findOne({
    where: {
      email,
    },
    attributes: ['id',
      'password',
      'email',
      'surname',
      'name',
      'authorizationAccess',
      'language',
      'enabled',
      'profile'
    ]
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failure",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(password, fetchedUser.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failure",
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser.id,
        },
        "my_secret_key",
        {
          expiresIn: "1h",
        }
      );
      fetchedUser.password = '';
      return res.status(200).json({
        token,
        user: fetchedUser,
        expiresIn: 3600,
      });
    })
    .catch((err) =>
      res.status(401).json({
        message: "Auth failure",
      })
    );
};
