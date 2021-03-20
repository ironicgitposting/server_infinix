const { Model } = require('sequelize');

// npx sequelize-cli model:generate
// --name Vehicule --attributes 
module.exports = (sequelize, DataTypes) => {
  class Vehicule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vehicule.init(
    {
      type: DataTypes.INTEGER,
      libelle: DataTypes.STRING,
      site: DataTypes.INTEGER,
      model: DataTypes.STRING,
      flagService: DataTypes.BOOLEAN,
      status: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      immatriculation: DataTypes.STRING,
      state: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Vehicule',
    },
  );
  return Vehicule;
};
