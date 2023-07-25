'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('api_resources', [
      {
        id: 1,
        endpoint: 'api-resources',
        name: 'Recursos Api',
        tableName: 'api_resources',
        tableDefinition: 'La tabla tendrá los campos: id, endpoint, name, tableName, tableDefinition. Indice en endpoint',
        modelDefinition: 'Tendrá una relación hasMany con AdminComponent (alias adminComponents)',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        endpoint: 'admin-components',
        name: 'Componentes de Administración',
        tableName: 'admin_components',
        tableDefinition: 'La tabla tendrá los campos: id, apiResourceId, element, endpoint (notnull), structure. Indice en la clave foranea apiResourceId y endpoint.',
        modelDefinition: 'Tendrá una relación belongsTo con ApiResource (alias apiResource)',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        endpoint: 'menus',
        name: 'Menús',
        tableName: 'menus',
        tableDefinition: 'La tabla tendrá los campos: id, name (notNull).',
        modelDefinition: 'Tendrá una relación hasMany con MenuItem (alias menuItems)',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        endpoint: 'menu-items',
        name: 'Elementos de Menú',
        tableName: 'menu_items',
        tableDefinition: 'La tabla tendrá los campos: id, menuId (notNull), localeSeoId, localeSeoSlugId, parentId, name (notNull), description,. Indice en la clave foranea menuId, en la clave foranea localeSeoId y en la clave foranea localeSeoSlugId.',
        modelDefinition: 'Tendrá una relación belongsTo con Menu (alias menu), con LocaleSeo (alias localeSeo) y con LocaleSeoSlug (alias localeSeoSlug).',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        endpoint: 'users',
        name: 'Usuarios',
        tableName: 'users',
        tableDefinition: 'La tabla tendrá los campos: id, name, email y password. Indice en el campo email..',
        modelDefinition: 'El modelo no tendrá relaciones y hará uso de la librería sequelize-bcrypt.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        endpoint: 'locale-seos',
        name: 'Enlaces Estáticos',
        tableName: 'locale_seos',
        tableDefinition: 'La tabla tendrá los campos: id, language (notnull), prefix, url (notnull), title (notnull), description, keywords, redirection (boolean), menu (boolean), changeFrequency, priority(decimal), sitemap(boolean). Indice en url.',
        modelDefinition: 'Tendrá una relación hasMany con LocaleSeoSlug (alias slugs), LocaleSeoRedirect (alias redirects), MenuItem (alias menuItems), FrontPage (alias frontPages) y AdminPage(alias adminPages).',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        endpoint: 'locale-seo-slugs',
        name: 'Enlaces Dinámicos',
        tableName: 'locale_seo_slugs',
        tableDefinition: 'La tabla tendrá los campos: id, localeSeoId (notnull), language (notnull), relParent (notnull), slug (notnull), key (notnull), parentSlug (integer, notnull), title (notnull), description y keywords. Indice en localeSeoId.',
        modelDefinition: 'Tendrá una relación belongsTo con LocaleSeo (alias localeSeo) y hasMany con MenuItem (alias menuItems).',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        endpoint: 'api-trackings',
        name: 'Tracking de la API',
        tableName: 'api_trackings',
        tableDefinition: 'La tabla tendrá los campos: id, userId, fingerprint, ip (notnull), isRobot (notnull), resource (notnull), resourceElement, method (notnull), httpCode (notnull), message, startTime (notnull, double), endTime (notnull, double) y latencyMS (notnull, double). Indices en userId y fingerprint.',
        modelDefinition: 'Tendrá una relación belongsTo con User (alias user) y con Fingerprint (alias fingerprint).',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        endpoint: 'page-trackings',
        name: 'Tracking de Páginas',
        tableName: 'page_trackings',
        tableDefinition: 'La tabla tendrá los campos: id, userId, fingerprint, ip (notnull), isRobot (notnull), localeSeoId (notnull), startTime (notnull, double), endTime (notnull, double) y latencyMS (notnull, double). Indices en userId, fingerprint y localeSeoId.',
        modelDefinition: 'Tendrá una relación belongsTo con User (alias user), con Fingerprint (alias fingerprint) y LocaleSe (alias localeSeo).',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        endpoint: 'user-trackings',
        name: 'Tracking de Usuarios',
        tableName: 'user_trackings',
        tableDefinition: 'La tabla tendrá los campos: id, userId, fingerprint, eventName, eventTime (notnull, double), path, event (text). Indices en userId y fingerprint.',
        modelDefinition: 'Tendrá una relación belongsTo con User (alias user) y con Fingerprint (alias fingerprint).',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('api_resources', null, {});
  }
};
