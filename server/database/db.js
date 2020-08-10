const Sequelize = require('sequelize')
const sequelize = new Sequelize('todo', 'root', '', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db.sqlite'
})
module.exports = sequelize