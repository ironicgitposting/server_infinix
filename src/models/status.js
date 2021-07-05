const { Model } = require('sequelize');

// npx sequelize-cli model:generate
// --name User --attributes firstName:string,lastName:string,
// email:string
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Status.belongsTo(models.FamilyStatus, { foreignKey: "familyStatus" });
    }
  }

  Status.init(
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
        modelName: 'Status',
        tableName: 'Status'
      })
  return Status;
};

