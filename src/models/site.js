'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class site extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // site.hasMany(models.status);
    }
  };
  site.init({
    libelle: DataTypes.STRING,
    adress: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    mail: DataTypes.STRING,
    pays: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Site',
  });
  return site;
};
