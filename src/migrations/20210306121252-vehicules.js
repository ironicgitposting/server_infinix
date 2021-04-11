'use strict';

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vehicules', {
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

      site: {
        type: Sequelize.STRING,
      },

      model: {
        type: Sequelize.STRING,
      },

      flagService:{
        type: Sequelize.BOOLEAN,
      },

      status:{
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vehicules');
  },
};
