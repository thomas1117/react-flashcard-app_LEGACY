const { DataTypes, Model } = require('sequelize')
const sequelize = require('../connection')

class Card extends Model {}
Card.init({
    // id: {
    //     primaryKey: true,
    //     type: DataTypes.UUIDV1
    // },
    front: {
        type: DataTypes.TEXT
    },
    back: {
        type: DataTypes.TEXT
    },
    meta: {
        type: DataTypes.STRING
    },
    language: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
}, {sequelize})
module.exports = { Card }