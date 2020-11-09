'use strict';
const { saltAndHash, createSalt} = require('../utils/auth')
const conn = require('../db')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await conn.query(
      `
      truncate table "Decks" RESTART IDENTITY CASCADE;
      truncate table "Users" RESTART IDENTITY CASCADE;
      truncate table "Sections" RESTART IDENTITY CASCADE;
      `
    )
    // await conn.query("SET FOREIGN_KEY_CHECKS = 0")
    // await conn.sync({force: true})
    // await conn.query("SET FOREIGN_KEY_CHECKS = 1")
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const salt = createSalt()
    await queryInterface.bulkInsert('Users', [{
      email: 'test@example.com',
      password: saltAndHash('test', salt),
      salt: salt,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    await queryInterface.bulkInsert('Decks', [{
      title: 'Deck 1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    await queryInterface.bulkInsert('Sections', [{
      title: 'Section 1',
      deckId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    await queryInterface.bulkInsert('Cards', [{
      front: 'function shorthand',
      back: 'const x = (y) => y',
      meta: 'es6 function',
      language: 'js',
      sectionId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    await queryInterface.bulkInsert('UsersDecks', [{
      userId: 1,
      deckId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
