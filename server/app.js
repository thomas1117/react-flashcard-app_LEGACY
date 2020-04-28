require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3001

const conn = require('./db-client').connection

const queryPromise = (sql) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) throw err;
            resolve(result)
        })
    })
}

app.get('/', async(req, res, next) => {
    let data
    try {
        data = await queryPromise(`SELECT * FROM deck, section, deck_section where deck.id = 1`)
    } catch(err) {
        console.log(err)
    }
    
    console.log(data)
    
    res.send(data)
})
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})