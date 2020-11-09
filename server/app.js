require('dotenv').config()
const { Deck, Section, Card } = require('./database/models')
const express = require('express')
const multer = require('multer')
const path = require('path')

const deckRoutes = require('./routes/decks')
const authRoutes = require('./routes/auth')

const { xmlToJSON } = require('../file-parser/xml')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(multer().none())
const PORT = process.env.PORT || 3001

// const passport = require('passport')
// const JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt
// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// opts.secretOrKey = 'secret'
// opts.issuer = 'accounts.examplesoft.com'
// opts.audience = 'yoursite.net'
// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     console.log(jwt_payload)
//     done()
// }))


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
