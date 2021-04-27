const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class FamilyStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }

  FamilyStatus.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        label: DataTypes.STRING,
      }, {
        sequelize,
        modelName: 'FamilyStatus',
      })
  return FamilyStatus;
};

