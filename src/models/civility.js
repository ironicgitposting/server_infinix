const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Civility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }

  Civility.init(
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
        modelName: 'Civility',
      })
  return Civility;
};

