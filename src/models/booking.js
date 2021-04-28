"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: "driver" });
      Booking.belongsTo(models.Vehicules, { foreignKey: "lentVehicule" });
      Booking.belongsTo(models.Site, { foreignKey: "departureSite" });
    }
  }
  Booking.init(
    {
      driver: DataTypes.INTEGER,
      lentVehicule: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: DataTypes.INTEGER,
      departureSite: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
