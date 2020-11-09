'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Deck, {as: 'decks', foreignKey: 'deckId'})
      this.hasMany(models.Card, {as: 'cards', foreignKey: 'sectionId'})
    }
  };
  Section.init({
    title: DataTypes.STRING,
    deckId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Section',
  });
  return Section;
};