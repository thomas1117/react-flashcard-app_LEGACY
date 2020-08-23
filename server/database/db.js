const Sequelize = require('sequelize')
// console.log(process.env)
function dbConfig(prod) {
    const o = {
        host: prod ? process.env.HOST_PROD : 'localhost',
        dialect: process.env.DIALECT,
        storage: 'db.sqlite',
        port: 5432,
    }
    if (o.dialect === 'postgres') {
        delete o.storage
        o.dialectOptions = {
            ssl: {
                require: true,
                rejectUnauthorized: false // <<<<<<< YOU NEED THIS
            }
        }
    }
    return o
}
let sequelize
if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(process.env.DB_NAME_PROD, process.env.USERNAME_PROD, process.env.PASSWORD_PROD, dbConfig(true))
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.USERNAME, process.env.PASSWORD, dbConfig(false))
}
    
(async () => {
    
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()
module.exports = sequelize