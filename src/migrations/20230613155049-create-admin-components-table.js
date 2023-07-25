'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admin_components', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      apiResourceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'api_resources',
          key: 'id'
        }
      },
      adminPageId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'admin_pages',
          key: 'id'
        },
      },
      endpoint: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
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
    }).then(() => queryInterface.addIndex('admin_components', ['apiResourceId'], {
      name: 'admin_components_api_resource_id_fk'    
    })).then(() => queryInterface.addIndex('admin_components', ['adminPageId'], {
      name: 'admin_components_admin_page_id_fk'
    }))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin_components')
  }
}
