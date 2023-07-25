'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('api_trackings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fingerprint: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ip: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isRobot: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      resource: {
        allowNull: false,
        type: Sequelize.STRING
      },
      resourceElement: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      method: {
        allowNull: false,
        type: Sequelize.STRING
      },
      httpCode: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      message: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      startTime: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      endTime: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      latencyMS: {
        allowNull: false,
        type: Sequelize.DOUBLE
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('api_trackings')
  }
};
