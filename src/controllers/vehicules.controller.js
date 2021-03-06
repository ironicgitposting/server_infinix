// DB Object
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const db = require('../models');

// Les Entités qu'on importe
const { Vehicule } = db.sequelize.models;

// Get all users
exports.getVehicules = async (req, res) => {
  try {
    const vehicules = await Vehicule.findAll();
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.createVehicule = async (req, res) => {
  const { registrationNumber, 
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
    archivedDate
  } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    const vehicule = new User({
      name,
      surname,
      profession,
      password: hash,
      email,
      telephone,
      site, 
      language,
      archived,
      archivedDate
    });

    await vehicule.save();

    res.status(200).json({
      message: 'Vehicule created',
    });
  } catch (error) {
    
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateVehicule = async (req, res) => {
  const id = req.params.id;
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
    archivedDate
        } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await Vehicule.update({ 
    surname, 
    name, 
    profession, 
    password: hash, 
    email,
    telephone,
    authorizationAccess,  
    site, 
    language, 
    archived, 
    archivedDate}, {
         where: { 
           id:id 
          }
    }).then( (result) => {

    if (result == 1){

      res.send({
        message: "User updated successfully"
      });

    } else {

      res.send({
        message: "Something went wrong when trying to update user with id= "+id+", maybe it was not found"
      });

    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating user with id = " + id
    });
  });
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: {id: id}
  }).then( (result) => {
    if(result == 1){

      res.send({ 
        message : "User was deleted successfully"
      });

    } else {
      
      res.send({ 
        message: "Cannot delete user with id= "+id+", maybe it wasn'nt found"
      });

    }
  }).catch(err => {
    res.status(500).send({
      ùessage: "Could not delete user with id : "+id
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
