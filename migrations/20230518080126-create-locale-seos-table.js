'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('locale_seos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      languageAlias: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prefix: {
        allowNull: false,
        type: Sequelize.STRING
      },
      url: {
        allowNull: true,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      keywords: {
        type: Sequelize.STRING
      },
      redirection: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      menu: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
      },
      changeFrequency: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.DECIMAL
      },
      sitemap: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('locale_seos')
  }
}
