const Sequelize = require('sequelize')
// console.log(process.env)
function dbConfig() {
    const o = {
        host: 'localhost',
        dialect: process.env.DIALECT,
        storage: 'db.sqlite',
    }
    if (o.dialect === 'postgres') {
        delete o.storage
        o.host = 'localhost'
    }
    return o
}
let sequelize
    if (process.env.NODE_ENV === 'production') {
        sequelize = new Sequelize(process.env.DB_URL)
    } else {
        sequelize = new Sequelize(process.env.DB_NAME, process.env.USERNAME, process.env.PASSWORD, dbConfig())
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