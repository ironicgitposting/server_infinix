module.exports = (sequelize, DataTypes) => {
  const vehicule = sequelize.define("vehicule", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    type: DataTypes.INTEGER,
    libelle: DataTypes.STRING,
    model: DataTypes.STRING,
    flagService: DataTypes.BOOLEAN,
    state: DataTypes.INTEGER,
    linkImage: DataTypes.STRING,
  });

  vehicule.associate = (models) => {
    vehicule.hasOne(models.status);
    vehicule.hasOne(models.site);
  };

  return vehicule;
};
