'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class familyStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  familyStatus.init(
    {
      label: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'FamilyStatus',
    },
  );
  return familyStatus;
};
