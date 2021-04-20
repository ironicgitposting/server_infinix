module.exports = (sequelize, DataTypes) => {
  const civility = sequelize.define("civility", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    label: DataTypes.STRING,
  });

  civility.associate = (models) => {};

  return civility;
};
