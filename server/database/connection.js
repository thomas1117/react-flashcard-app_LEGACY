const sequelize = require('./db')
const { DataTypes } = require('sequelize')
require('dotenv').config()

const { 
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_DIALECT,
  DB_PORT
} = process.env
sequelize.sync()
module.exports = sequelize