const {
  Model,
} = require('sequelize');

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
      // define association here
    }
  }
  User.init({
    registrationNumber: DataTypes.STRING,
    surname: DataTypes.STRING,
    name: DataTypes.STRING,
    profession: DataTypes.INTEGER,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
    authorization_access: DataTypes.INTEGER,
    dateCreated: DataTypes.DATE,
    dateUpdated: DataTypes.DATE,
    dateLastSeen: DataTypes.DATE,
    site: DataTypes.INTEGER,
    language: DataTypes.INTEGER,
    archived: DataTypes.BOOLEAN,
    archivedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    underscored: true
  });
  return User;
};
