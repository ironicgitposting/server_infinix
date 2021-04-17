module.exports = (sequelize, DataTypes) => {
  const familyStatus = sequelize.define("familyStatus", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    label: DataTypes.STRING,
  });

  familyStatus.associate = (models) => {};

  return familyStatus;
};
