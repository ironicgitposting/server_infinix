module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define("status", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    label: DataTypes.STRING,
  });

  status.associate = (models) => {
    status.hasOne(models.familyStatus);
  };

  return status;
};
