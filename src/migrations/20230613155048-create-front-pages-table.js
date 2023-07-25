'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('front_pages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      localeSeoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'locale_seos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      structure: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('front_pages', ['url'], {
      name: 'front_pages_url_uindex',
      unique: true
    })).then(() => queryInterface.addIndex('front_pages', ['localeSeoId'], {
      name: 'front_pages_localeSeoId_fk'
    }))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('front_pages')
  }
};
