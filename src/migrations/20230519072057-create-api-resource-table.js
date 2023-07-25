'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('api_resources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      endpoint: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tableName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tableDefinition: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      modelDefinition: {
        type: Sequelize.TEXT,
        allowNull: false
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
    })
      .then(() => queryInterface.addIndex('api_resources', ['endpoint'], {
        name: 'api_resources_url_unique',
        unique: true
      }));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('api_resources');
  }
};