const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Setting extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }

    Setting.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            type: DataTypes.INTEGER,
            label: DataTypes.STRING,
            description: DataTypes.STRING,
            flag: DataTypes.INTEGER
        }, {
            sequelize,
            modelName: 'Setting',
        })
    return Setting;
};

