// DB Object
const db = require("../models");
const { Setting } = db.sequelize.models;

const SettingsTypeEnum = Object.freeze({
    "GENERAL": 0,
    "MAILING": 1,
    "NOTIFICATION": 2,
    "CARPOOLING": 3,  // Co-Voiturage
});

exports.updateSetting = async (req, res) => {
    // Check if current user is admin
    try {
        let setting = await Setting.findOne({ where: { label: req.body.label } })
        if (setting) {
            setting.flag = req.body.flag;
            await setting.save();
            return res.status(200).json({
                message: "Setting updated"
            });
        }
    } catch (error) {
        return res.status(500).json({
            error,
        });
    }
}

exports.getSettings = async (req, res) => {
    try {
        const settings = await Setting.findAll();

        res.status(200).json({
            settings,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
}


