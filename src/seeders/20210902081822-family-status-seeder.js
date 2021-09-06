'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) =>

        queryInterface.bulkInsert("FamilyStatus", [
            {
                id: 1,
                label: "Site",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                label: "Reservation",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                label: "Sinister",
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]),

    down: async (queryInterface, Sequelize) =>
        queryInterface.bulkDelete("FamilyStatus", null, {})
};
