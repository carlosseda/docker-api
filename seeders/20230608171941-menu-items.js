'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    let localeSeoBulk = [
      {
        id: 1,
        menuId: 1,
        localeSeoId: 1,
        order: 1,
        private: "0"
      },
      {
        id: 2,
        menuId: 1,
        localeSeoId: 2,
        order: 2,
        private: "0"
      },
      {
        id: 3,
        menuId: 1,
        localeSeoId: 3,
        order: 3,
        private: "0"
      },
      {
        id: 4,
        menuId: 1,
        localeSeoId: 4,
        order: 4,
        private: "0"
      },
      {
        id: 5,
        menuId: 1,
        localeSeoId: 5,
        order: 5,
        private: "0"
      }
    ];

    await queryInterface.bulkInsert('menu_items', localeSeoBulk.map(item => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date()
    })), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('menu_items', null, {});
  }
};
