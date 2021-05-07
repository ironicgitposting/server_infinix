"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        "Status", // name of Source model
        "familyStatus", // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: "FamilyStatus", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onDelete: "SET NULL",
        }
      )
      .then(() => {
        return queryInterface.addColumn("Users", "status", {
          type: Sequelize.INTEGER,
          references: {
            model: "Status",
            key: "id",
          },
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        return queryInterface.addColumn("Users", "civility", {
          type: Sequelize.INTEGER,
          references: {
            model: "Civility",
            key: "id",
          },
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        return queryInterface.addColumn("Site", "status", {
          type: Sequelize.INTEGER,
          references: {
            model: "Status",
            key: "id",
          },
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        return queryInterface.addColumn("Vehicules", "status", {
          type: Sequelize.INTEGER,
          references: {
            model: "Status",
            key: "id",
          },
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        return queryInterface.addColumn("Vehicules", "site", {
          type: Sequelize.INTEGER,
          references: {
            model: "Site",
            key: "id",
          },
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        return queryInterface.addColumn('Bookings','departureSite',{
            type: Sequelize.INTEGER,
            references:{
              model: 'Site',
              key: 'id'
            },
            onDelete: 'SET NULL'
          });
      })
      .then(() => {
        return queryInterface.addColumn('Bookings','lentVehicule',{
            type: Sequelize.INTEGER,
            references:{
              model: 'Vehicules',
              key: 'id'
            },
            onDelete: 'SET NULL'
          });
      })
      .then(() => {
        return queryInterface.addColumn('Bookings','driver',{
            type: Sequelize.INTEGER,
            references:{
              model: 'Users',
              key: 'id'
            },
            onDelete: 'SET NULL'
          });
      })
      .then(() => {
        return queryInterface.addColumn('Bookings','status',{
          type: Sequelize.INTEGER,
          references:{
            model: 'Status',
            key: 'id'
          },
          onDelete: 'SET NULL'
        }).then(() => {
          return queryInterface.addColumn("Settings", "user", {
            type: Sequelize.INTEGER,
            references: {
              model: "Users",
              key: "id",
            },
            onDelete: "SET NULL",
          })
        })

      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        "Status", // name of Source model
        "familyStatus" // key we want to remove
      )
      .then(() => {
        return queryInterface.removeColumn("Users", "status");
      })
      .then(() => {
        return queryInterface.removeColumn("Users", "civility");
      })
      .then(() => {
        return queryInterface.removeColumn("Site", "status");
      })
      .then(() => {
        return queryInterface.removeColumn("Vehicules", "status");
      })
      .then(() => {
        return queryInterface.removeColumn("Vehicules", "site");

      })
      .then(() => {
        return queryInterface.removeColumn('Bookings','departureSite');
      })
      .then(() => {
        return queryInterface.removeColumn('Bookings','lentVehicule');
      })
      .then(() => {
        return queryInterface.removeColumn('Bookings','driver');
      })
      .then(() => {
        return queryInterface.removeColumn('Bookings','status');

      }).then(() => {
        return queryInterface.removeColumn("Settings", "user")

      });
  },
};
