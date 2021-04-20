'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vehicule', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      type: {
        type: Sequelize.STRING
      },
      libelle: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      flagService: {
        type: Sequelize.BOOLEAN
      },
      state: {
        type: Sequelize.INTEGER
      },
      linkImage: {
        type: Sequelize.STRING,
        vaidate: {
          isUrl: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vehicules');
  }
};