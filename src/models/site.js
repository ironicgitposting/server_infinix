module.exports = (sequelize, DataTypes) => {
  const site = sequelize.define("site", {
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
  });

  site.associate = (models) => {
    site.hasOne(models.status);
  };

  return site;
};
