// DB Object
const db = require("../models");
const { User, Setting } = db.sequelize.models;

const SettingsTypeEnum = Object.freeze({
    "GENERAL": 0,
    "MAILING": 1,
    "NOTIFICATION": 2,
    "CARPOOLING": 3,  // Co-Voiturage
});

export function updateSetting() {
    // Check if current user is admin


}

export function getSettings() {
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


