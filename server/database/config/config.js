require('dotenv').config()

module.exports = {
    "development": {
        "username": process.env.USERNAME,
        "password": process.env.PASSWORD,
        "database": process.env.DB_NAME,
        "host": "127.0.0.1",
        "dialect": "postgres",
        "logging": false
    }
}