module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [{
        firstName: 'Kobe',
        lastName: 'Bryant',
        email: 'kobe@blackmamba.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Big',
        lastName: 'Shaq',
        email: 'shaq@bigcactus.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  ),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
