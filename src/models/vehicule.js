'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      vehicule.hasMany(models.status);
      vehicule.hasMany(models.site);
    }
  };
  vehicule.init({
    type: DataTypes.INTEGER,
    libelle: DataTypes.STRING,
    site: DataTypes.INTEGER,
    model: DataTypes.STRING,
    flagService: DataTypes.BOOLEAN,
    status: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    linkImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vehicule',
  });
  return vehicule;
};