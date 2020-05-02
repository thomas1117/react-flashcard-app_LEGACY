const { DataTypes, Model } = require('sequelize')
const sequelize = require('../connection')

class Card extends Model {}
Card.init({
    front: {
        type: DataTypes.TEXT
    },
    back: {
        type: DataTypes.TEXT
    },
    meta: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
}, {sequelize})
module.exports = { Card }