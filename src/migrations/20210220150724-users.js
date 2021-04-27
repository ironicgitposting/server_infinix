"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },

      registrationNumber: {
        type: Sequelize.STRING,
      },

      surname: {
        type: Sequelize.STRING,
      },

      name: {
        type: Sequelize.STRING,
      },

      profession: {
        type: Sequelize.INTEGER,
      },

      password: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
      },

      telephone: {
        type: Sequelize.STRING,
      },

      authorizationAccess: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        type: Sequelize.DATE,
      },

      updatedAt: {
        type: Sequelize.DATE,
      },

      dateLastSeen: {
        type: Sequelize.DATE,
      },

      site: {
        type: Sequelize.INTEGER,
      },

      language: {
        type: Sequelize.INTEGER,
      },

      archived: {
        type: Sequelize.BOOLEAN,
      },

      enabled: {
        type: Sequelize.BOOLEAN,
      },

      archivedDate: {
        type: Sequelize.DATE,
      },
      flagChangePassword: {
        type: Sequelize.BOOLEAN,
      },
      flagDurablePassword: {
        type: Sequelize.BOOLEAN,
      },
      profile: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
