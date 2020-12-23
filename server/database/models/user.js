'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //  foreign key relates to itself here
      this.belongsToMany(models.Deck, {through: 'UsersDecks', foreignKey: 'userId'})
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  })
//   User.sync(true)
//   User.belongsToMany(Deck, {through: UserDeck})
  return User;
}