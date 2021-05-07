'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Settings", {
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
      description: {
        type: Sequelize.STRING,
      },
      flag: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.INTEGER,
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
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Settings");
    }
  }
};
