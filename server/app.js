require('dotenv').config()
const { Deck, Section, Card } = require('./database/models')
const express = require('express')
const multer = require('multer')
const path = require('path')

const deckRoutes = require('./routes/decks')

const { xmlToJSON } = require('../file-parser/xml')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(multer().none())
const PORT = process.env.PORT || 3001

app.use('/api', deckRoutes)
// used for deployment...
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
