'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('locales', [
      {
        id: 1,
        languageAlias: 'es',
        entity: 'menu-item',
        entityId: 1,
        key: 'name',
        value: 'Panel de control',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        languageAlias: 'es',
        entity: 'menu-item',
        entityId: 2,
        key: 'name',
        value: 'Generador de recursos API',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        languageAlias: 'es',
        entity: 'menu-item',
        entityId: 3,
        key: 'name',
        value: 'Usuarios',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        languageAlias: 'es',
        entity: 'menu-item',
        entityId: 4,
        key: 'name',
        value: 'Menus',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        languageAlias: 'es',
        entity: 'menu-item',
        entityId: 5,
        key: 'name',
        value: 'SEO',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('locales', null, {});
  }
};
