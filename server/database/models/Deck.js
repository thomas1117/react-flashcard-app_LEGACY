'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //  foreign key relates to itself here
      this.belongsToMany(models.User, {through: 'UsersDecks', foreignKey: 'deckId'})
      this.hasMany(models.Section, {as: 'sections', foreignKey: 'deckId'})
    }
  }
  Deck.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Deck',
  })
  return Deck
}