// DB Object
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const db = require("../models");
const MailController = require("./mails.controller");
const Op = require('sequelize').Op;

// Les Entités qu'on importe
const { User, Setting } = db.sequelize.models;

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        archived: {
          [Op.or]: [false, null]
        },
      }
    });

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
  let {
    surname,
    name,
    profession,
    password,
    email,
    telephone,
    site,
    language,
    archived,
    archivedDate,
    authorizationAccess
  } = req.body;

  const hash = await bcrypt.hash(password || 'Pa$$w0rd', 10);

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
      authorizationAccess
    });

    // User must be activated manually by an admin
    user.enabled = false;
    await user.save();

    MailController.sendMailUserCreationRequest(user);

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
  const user = await User.findOne({ where: { email } });
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
      console.log("User activated: " + userUpdated.enabled);
      // Mail d'activation ici
      const mailSetting = await Setting.findOne({
        where: { label: "Activation Utilisateur" },
      });

      if (mailSetting && Boolean(mailSetting.flag)) {
        MailController.sendMailUserActiverCompte(user);
      }
    }
    if (propsUpdated.includes("enabled") && !userUpdated.enabled) {
      console.log("User deactivated: " + userUpdated.email);
      console.log("User deactivated: " + userUpdated.enabled);
      // Mail de désactivation de compte utilisateur
      const mailSetting = await Setting.findOne({
        where: { label: "Desactivation Utilisateur" },
      });
      if (mailSetting && Boolean(mailSetting.flag)) {
        MailController.sendMailUserDesactiverCompte(user);
      }
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

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      user.archived = true;
      await user.save();
      return res.status(204).json({
        message: "User archived successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
  return res.status(400).json({
    message: "Bad request",
  });
};

exports.initPasswordReset = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ where: { email } });
  try {
    if (user) {
      const tempToken = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        "my_secret_key",
        {
          expiresIn: "10m",
        }
      );

      MailController.sendResetPasswordForm(user, tempToken);
    }
    res.status(200).json({
      message: `If a matching account was found an email was sent to ${email} to allow you to reset your password.
`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, clearPassword } = req.body;
  const decodedToken = jwt.verify(token, "my_secret_key");
  if (decodedToken && decodedToken.iat < decodedToken.exp) {
    try {
      const email = decodedToken.email;
      let user = await User.findOne({ where: { email } });
      if (user) {
        bcrypt.hash(clearPassword, 10, async (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: `Couldn't update password for user: ${user.email}`,
            });
          }
          user.password = hash;
          await user.save();
          return res.status(204).json({
            message: "Password updated",
          });
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  return res.status(400).json({
    message: "Bad request",
  });
};

exports.deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      user.archived = true;
      await user.save();
      return res.status(204).json({
        message: "User archived successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
  return res.status(400).json({
    message: "Bad request",
  });
};

exports.loginUser = async (req, res) => {
  let fetchedUser;
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
      archived: {
        [Op.or]: [false, null]
      }
    },
    attributes: [
      "id",
      "password",
      "email",
      "surname",
      "name",
      "authorizationAccess",
      "language",
      "enabled",
      "profile",
      "dateLastSeen",
    ],
  });

  if (!user) {
    return res.status(401).json({
      message: "Auth failure",
    });
  } else {
    fetchedUser = user;
    const validLogin = await bcrypt.compare(password, fetchedUser.password);
    if (!validLogin) {
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
    user.dateLastSeen = Date.now();
    await user.save();
    fetchedUser.password = "";
    return res.status(200).json({
      token,
      user: fetchedUser,
      expiresIn: 3600,
    });
  }
};

// Get one users
exports.getUserById = async (req, res) => {
  try {
    return User.findOne({ where: { id: req } });
  } catch (error) {
    throw "impossible de trouver l'utilisateur avec la clé " + req.id;
  }
};
