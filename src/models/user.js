const { Model } = require('sequelize');

// npx sequelize-cli model:generate
// --name User --attributes firstName:string,lastName:string,
// email:string
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Status);
      //User.hasMany();
    }
  }

  User.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        registrationNumber: DataTypes.STRING,
        surname: DataTypes.STRING,
        name: DataTypes.STRING,
        profession: DataTypes.INTEGER,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        telephone: DataTypes.STRING,
        authorizationAccess: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        dateLastSeen: DataTypes.DATE,
        site: DataTypes.INTEGER,
        language: DataTypes.INTEGER,
        archived: DataTypes.BOOLEAN,
        archivedDate: DataTypes.DATE,
        enabled: DataTypes.BOOLEAN,
        flagChangePassword: DataTypes.BOOLEAN,
        flagDurablePassword: DataTypes.BOOLEAN,
  }, {
          sequelize,
          modelName: 'User',
      })
  return User;
};


