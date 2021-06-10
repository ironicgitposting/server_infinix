const { Model } = require("sequelize");

// npx sequelize-cli model:generate
// --name User --attributes firstName:string,lastName:string,
// email:string
module.exports = (sequelize, DataTypes) => {
  class Vehicule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehicule.belongsTo(models.Status, { foreignKey: 'status'});
      Vehicule.belongsTo(models.Site, { foreignKey: 'site'});
      Vehicule.hasMany(models.Booking, { foreignKey: 'lentVehicule'});
    }
  }

  Vehicule.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      type: DataTypes.INTEGER,
      libelle: DataTypes.STRING,
      site: DataTypes.INTEGER,
      model: DataTypes.STRING,
      flagService: DataTypes.BOOLEAN,
      status: DataTypes.INTEGER,
      immatriculation: DataTypes.STRING,
      state: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Vehicule",
    }
  );
  return Vehicule;
};
