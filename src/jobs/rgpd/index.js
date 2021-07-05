/**
 * RGPD CRON
 * User Data anonymization
 *
 * La durée de conservation des données personelles n'est pas fixée
 * par le CNIL. Il appartient donc à chaque application de limiter
 * la durée de conservation des données dans un délai maximum de 5 ans.
 *
 * https://www.cnil.fr/fr/les-durees-de-conservation-des-donnees
 *
 * On part sur 24 mois, assez de temps pour revenir vers un utilisateur
 * en cas de litiges.
 *
 */
const moment = require("moment");
const db = require("../../models");
const { User } = db.sequelize.models;
const crypto = require("crypto");
module.exports = async ({ unit, delay }) => {
  // Get ALl users last login > delay unit
  const pastMoment = moment().subtract(delay, unit).toDate();
  const users = await User.findAll();
  users.forEach(async (user) => {
    if (user.archived && !(user.dateLastSeen > pastMoment)) {
      user.name = crypto.randomBytes(6).toString("hex");
      user.surname = crypto.randomBytes(6).toString("hex");
      // On repasse user.archived à null pour éviter de remodifier cet user tous les
      // soirs
      user.archived = null;
      user.email =
        crypto.randomBytes(6).toString("hex") +
        "@" +
        crypto.randomBytes(6).toString("hex");
      await user.save();
    }
  });
};
