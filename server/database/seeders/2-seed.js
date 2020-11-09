'use strict';
const { saltAndHash, createSalt} = require('../utils/auth')
const conn = require('../db')
const SEED = require('../../SEED.json')
const { normalize } = require('../utils/indent')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const deck = await queryInterface.bulkInsert('Decks', [{
        title: 'js',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {returning: true})
    for (let section of SEED) {
        // console.log(section)
        // console.log(section)
        const s = await queryInterface.bulkInsert('Sections', [{
            title: section.title,
            deckId: deck[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {returning: true})
        for (let card of section.cards) {
            await queryInterface.bulkInsert('Cards', [{
                front: normalize(card.front),
                back: normalize(card.back),
                meta: card.meta,
                language: card.language,
                sectionId: s[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
              }], {})
        }
    }
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
