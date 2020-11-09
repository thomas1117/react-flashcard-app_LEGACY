'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {through: 'UsersDecks'})
      this.hasMany(models.Section, {as: 'sections', foreignKey: 'deckId'})
    }
  };
  Deck.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Deck',
  });
  // Deck.hasMany(User, {as: 'User', foreignKey: 'userId'})
  return Deck;
};