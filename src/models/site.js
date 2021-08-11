const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Site extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Site.belongsTo(models.Status, { foreignKey: 'status'});
      // Site.hasMany(models.Vehicule, { foreignKey: 'site'});
    }
  }

  Site.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        label: DataTypes.STRING,
        adress: DataTypes.STRING,
        postalCode: DataTypes.STRING,
        city: DataTypes.STRING,
        phone: DataTypes.STRING,
        mail: DataTypes.STRING,
        pays: DataTypes.STRING,
        status: DataTypes.INTEGER,
        latitude: DataTypes.DOUBLE,
        longitude: DataTypes.DOUBLE
      }, {
        sequelize,
        modelName: 'Site',
        tableName: 'Site'
      })
  return Site;
};

