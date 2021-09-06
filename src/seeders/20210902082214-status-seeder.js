'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert("Status", [
            {
                id: 1,
                label: "En attente de validation",
                createdAt: new Date(),
                updatedAt: new Date(),
                familyStatus: 2
            },
            {
                id: 2,
                label: "En cours",
                createdAt: new Date(),
                updatedAt: new Date(),
                familyStatus: 2
            },
            {
                id: 3,
                label: "Clôturé",
                createdAt: new Date(),
                updatedAt: new Date(),
                familyStatus: 2
            },
            {
                id: 4,
                label: "Validé",
                createdAt: new Date(),
                updatedAt: new Date(),
                familyStatus: 2
            },
            {
                id: 5,
                label: "En retard",
                createdAt: new Date(),
                updatedAt: new Date(),
                familyStatus: 2
            },
            {
                id: 6,
                label: "Annulé",
                createdAt: new Date(),
                updatedAt: new Date(),
                familyStatus: 2
            },
            {
                id: 1000,
                label: "Site Ouvert",
                createdAt: new Date(),
                updatedAt: new Date(),
                familyStatus: 1
            },
            {
                id: 2000,
                label: "Site Fermé",
                createdAt: new Date(),
                updatedAt: new Date(),
                familyStatus: 1
            },
            {
                id: 100,
                label: "Découvert",
                createdAt: new Date(),
                updatedAt: new Date(),
                familyStatus: 3
            },
            {
                id: 200,
                label: "Pris en charge",
                createdAt: new Date(),
                updatedAt: new Date(),
                familyStatus: 3
            },
            {
                id: 300,
                label: "Résolu",
                createdAt: new Date(),
                updatedAt: new Date(),
                familyStatus: 3
            },
        ]),

    down: async (queryInterface, Sequelize) =>
        queryInterface.bulkDelete("Status", null, {})
};
