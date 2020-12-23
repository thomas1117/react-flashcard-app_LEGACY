'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Section, {as: 'card', foreignKey: 'sectionId'})
    }
  };
  Card.init({
    front: DataTypes.TEXT,
    back: DataTypes.TEXT,
    meta: DataTypes.STRING,
    language: DataTypes.STRING,
    sectionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Card',
  })
  return Card;
}