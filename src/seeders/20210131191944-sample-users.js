module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("Users", [
      {
        surname: "admin",
        name: "admin",
        password: "admin",
        email: "infinix.supp@gmail.com",
        telephone: "0000000000",
        authorizationAccess: 1,
      },
    ]),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};
