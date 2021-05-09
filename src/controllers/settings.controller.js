// DB Object
const db = require("../models");
const { User, Setting } = db.sequelize.models;

const SettingsTypeEnum = Object.freeze({
    "GENERAL":0,
    "MAILING":1,
    "NOTIFICATION":2,
    "CARPOOLING":3,  // Co-Voiturage
});

export function createSetting() {
}

export function updateSetting() {
}

export function deleteSetting() {
}

export function getSettingsByUserId() {
}


