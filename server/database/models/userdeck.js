'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDeck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserDeck.init({
    userId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserDeck',
  });
  return UserDeck;
};