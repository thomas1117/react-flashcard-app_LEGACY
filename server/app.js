require('dotenv').config()
const { Deck, Section, Card } = require('./database/models')
const express = require('express')
const path = require('path')

const deckRoutes = require('./routes/decks')

const { xmlToJSON } = require('../file-parser/xml')
const app = express()
app.use(express.json())
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
