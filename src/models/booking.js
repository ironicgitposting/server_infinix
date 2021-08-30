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
      Booking.belongsTo(models.Vehicule, { foreignKey: "lentVehicule" });
      Booking.belongsTo(models.Site, { as: "departureSite", foreignKey: "departure_site" });
      Booking.belongsTo(models.Site, { as: "arrivalSite", foreignKey: "arrival_site" });
      Booking.belongsTo(models.Status, { foreignKey: "status" });
    }
  }
  Booking.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      driver: DataTypes.INTEGER,
      lentVehicule: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: DataTypes.INTEGER,
      killometrage: DataTypes.INTEGER,
      essence: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
