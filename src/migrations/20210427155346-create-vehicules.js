"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Vehicules", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      type: {
        type: Sequelize.INTEGER,
      },

      libelle: {
        type: Sequelize.STRING,
      },

      model: {
        type: Sequelize.STRING,
      },

      flagService: {
        type: Sequelize.BOOLEAN,
      },

      createdAt: {
        type: Sequelize.DATE,
      },

      updatedAt: {
        type: Sequelize.DATE,
      },

      immatriculation: {
        type: Sequelize.STRING,
      },

      state: {
        type: Sequelize.STRING,
      },
      killometrageVehicle: {
        type: Sequelize.INTEGER
      },
      essenceVehicule: {
        type: Sequelize.INTEGER
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Vehicules");
  },
};
