const { Model } = require('sequelize');

// npx sequelize-cli model:generate
// --name User --attributes firstName:string,lastName:string,
// email:string
module.exports = (sequelize, DataTypes) => {
  class Vehicule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehicule.hasOne(models.Status);
      Vehicule.hasOne(models.Site);
    }
  }

  Vehicule.init(
      {
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
        immatriculation: DataTypes.STRING,
        state: DataTypes.INTEGER,
        
      }, {
        sequelize,
        modelName: 'Vehicule',
      })
  return Vehicule;
};


