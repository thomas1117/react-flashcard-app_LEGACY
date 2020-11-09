'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      front: {
        type: Sequelize.TEXT,
      },
      back: {
        type: Sequelize.TEXT,
      },
      meta: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      sectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sections',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cards');
  }
};