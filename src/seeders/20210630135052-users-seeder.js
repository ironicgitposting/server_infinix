
module.exports = {
  up: async (queryInterface, Sequelize) =>

    queryInterface.bulkInsert("Users", [
      {
        surname: "admin",
        name: "admin",
        password: "@Dm1nistrateur",
        password: "$2b$10$hHt5vOLi76RUIgVIQ8vwNOGkrjP.MOhKk85qA8SbloGOly2vbKTBa", // mdp: @Dm1nistrateur
        email: "infinix.supp@gmail.com",
        telephone: "0000000000",
        authorizationAccess: 1,
        enabled: true,
      },
    ]),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};
