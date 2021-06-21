const { Model } = require("sequelize");

// npx sequelize-cli model:generate
// --name User --attributes firstName:string,lastName:string,
// email:string
module.exports = (sequelize, DataTypes) => {
  class Sinister extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sinister.belongsTo(models.Vehicule, { foreignKey: 'idVehicle'});
      Sinister.belongsTo(models.Status, { foreignKey: 'status'});
    }
  }

  Sinister.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      libelle: DataTypes.STRING,
      status: DataTypes.INTEGER,
      idVehicle: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Sinister",
    }
  );
  return Sinister;
};
