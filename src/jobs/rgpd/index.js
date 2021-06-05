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
const db = require("../../models");
const { User } = db.sequelize.models;
module.exports = async (months) => {
  // Get ALl users
  const users = await User.findAll();
  console.log();
  // Archive all users date last login > 24 mois

  // Anononymize all archived users date last login > 24 months
};
