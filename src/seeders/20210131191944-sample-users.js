const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) =>

    queryInterface.bulkInsert("Users", [
      {
        surname: "admin",
        name: "admin",
        password: "$2b$10$xT5nQNakY1Q.JQ9mGbIvr.CCSmG/8FQeyv144b8l9t4jdWJ/vD9LO", // mdp: @Dm1nistrateur
        email: "infinix.supp@gmail.com",
        telephone: "0000000000",
        authorizationAccess: 1,
        enabled: true,
      },
    ]),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};
