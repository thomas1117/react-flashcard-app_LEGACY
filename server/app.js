require('dotenv').config()
const path = require('path')
const express = require('express')
const passport = require('passport')
// const { xmlToJSON } = require('../file-parser/xml')
const auth = require('./middleware/auth')
const attachUser = require('./middleware/attachUser')
const PORT = process.env.PORT || 3001

const deckRoutes = require('./routes/decks')
const authRoutes = require('./routes/auth')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', deckRoutes)
app.use('/api', authRoutes)
app.get('/api/test', auth, attachUser, function(req, res) {
  res.json(req.user)
})
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
