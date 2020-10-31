const { DataTypes, Model } = require('sequelize')
const sequelize = require('../connection')
const { Section } = require('./Section')

class Deck extends Model {}
Deck.init({
    // id: {
    //     primaryKey: true,
    //     type: DataTypes.UUIDV1
    // },
    title: {
        type: DataTypes.STRING
    },
}, {sequelize})
Deck.hasMany(Section, {as: 'sections', foreignKey: 'deckId'})
module.exports = { Deck }