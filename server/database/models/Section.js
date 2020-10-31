const { DataTypes, Model } = require('sequelize')
const sequelize = require('../connection')
const { Card } = require('./Card')
const { Deck } = require('./Deck')

class Section extends Model {}

Section.init({
    // id: {
    //     primaryKey: true,
    //     type: DataTypes.UUIDV1
    // },
    title: {
        type: DataTypes.STRING
    },
}, {sequelize})

Section.hasMany(Card, {as: 'cards', foreignKey: 'sectionId'})
// Section.belongsToMany(Deck, { through: 'SectionDecks'})
module.exports = { Section }