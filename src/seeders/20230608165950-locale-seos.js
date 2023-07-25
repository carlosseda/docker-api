'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    let localeSeoBulk = [
      {
        id: 1,
        languageAlias: 'es',
        prefix: 'admin',
        url: 'panel-de-control',
        title: 'Panel de control',
        menu: 1,
        sitemap: 0
      },
      {
        id: 2,
        languageAlias: 'es',
        prefix: 'admin',
        url: 'recursos-api',
        title: 'Generador de recursos administrativos',
        menu: 1,
        sitemap: 0
      },
      {
        id: 3,
        languageAlias: 'es',
        prefix: 'admin',
        url: 'usuarios',
        title: 'Usuarios',
        menu: 1,
        sitemap: 0
      },
      {
        id: 4,
        languageAlias: 'es',
        prefix: 'admin',
        url: 'menus',
        title: 'Menús',
        menu: 1,
        sitemap: 0
      },
      {
        id: 5,
        languageAlias: 'es',
        prefix: 'admin',
        url: 'seo',
        title: 'SEO',
        description: 'SEO',
        menu: 1,
        sitemap: 0
      },
      {
        id: 6,
        languageAlias: 'es',
        prefix: 'front',
        url: 'login',
        title: 'Login',
        description: 'Login',
        menu: null,
        sitemap: 0
      }
    ];

    await queryInterface.bulkInsert('locale_seos', localeSeoBulk.map(item => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date()
    })), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('locale_seos', null, {});
  }
};
