module.exports = {
  up: async (queryInterface, Sequelize) =>

    queryInterface.bulkInsert("Settings", [
      {
        type: 1,
        label: "Confirmation Admin",
        description: "Envoie du mail à l'admin après inscription d'un utilisateur",
        flag: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        type: 1,
        label: "Confirmation Utilisateur",
        description: "Envoie du mail à l'utilisateur après inscription d'un utilisateur",
        flag: 0,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        type: 1,
        label: "Activation Utilisateur",
        description: "Envoie un mail à l'utilisateur après l'activation de celui-ci.",
        flag: 0,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        type: 1,
        label: "Desactivation Utilisateur",
        description: "Envoie un mail à l'utilisateur après la désactivation de celui-ci.",
        flag: 0,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
    ]),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Settings", null, {}),
};
