const express = require('express')
const router = express.Router()
const db = require('../database/models')
const { User } = db
const jwt = require('jsonwebtoken')
const sha512 = require('js-sha512')
const { createSalt } = require('../database/utils/auth')

router.post('/registration', async (req, res) => {
  const user = await User.findOne({where: {email: req.body.email}})
  if (user) {
      res.status(400).json({message: 'user already exists'})
  }
  const salt = createSalt()
  const u = {
    email: req.body.email,
    password: sha512(req.body.password + salt),
    salt
  }
  const newUser = await User.create(u)
  res.json({token: jwt.sign({id: newUser.id, email: newUser.email}, process.env.SECRET)})
})
router.post('/login', async (req, res) => {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
        res.status(400).json({message: 'invalid user or password'})
    }
    const hashedPassword = sha512(req.body.password + user.salt)
    if (user.password === hashedPassword) {
        res.json({token: jwt.sign({id: user.id, email: user.email}, process.env.SECRET)})
    }
    res.status(400).json({message: 'invalid user or password'})
  })

module.exports = router
