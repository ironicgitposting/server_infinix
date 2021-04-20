module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
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
    flagChangePassword: DataTypes.BOOLEAN,
    flagDurablePassword: DataTypes.BOOLEAN,
  });

  user.associate = (models) => {
    user.hasOne(models.status);
    user.hasOne(models.civility);
  };

  return user;
};
