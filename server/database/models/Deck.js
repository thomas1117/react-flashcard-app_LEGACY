const { DataTypes, Model } = require('sequelize')
const sequelize = require('../connection')
const { Section } = require('./Section')

class Deck extends Model {}
Deck.init({
    title: {
        type: DataTypes.STRING
    },
}, {sequelize})
Deck.hasMany(Section, {as: 'sections', foreignKey: 'deckId'})
module.exports = { Deck }