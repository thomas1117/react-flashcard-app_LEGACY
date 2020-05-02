const { DataTypes, Model } = require('sequelize')
const sequelize = require('../connection')
const { Card } = require('./Card')
const { Deck } = require('./Deck')

class Section extends Model {}

Section.init({
    title: {
        type: DataTypes.STRING
    },
}, {sequelize})

Section.hasMany(Card)
// Section.belongsToMany(Deck, { through: 'SectionDecks'})
module.exports = { Section }