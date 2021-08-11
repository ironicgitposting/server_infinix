"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Site", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      label: {
        type: Sequelize.STRING,
      },
      adress: {
        type: Sequelize.STRING,
      },
      postalCode: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      mail: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      pays: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.DOUBLE,
      },
      longitude: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Sites");
  },
};
