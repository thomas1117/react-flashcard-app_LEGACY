const express = require('express')
const router = express.Router()
const db = require('../database/models')
const { User } = db
const jwt = require('jsonwebtoken')
const sha512 = require('js-sha512')
const { createSalt } = require('../database/utils/auth')
const AuthController = require('../controllers/auth')

router.post('/registration', AuthController.registerUser)
router.post('/login', AuthController.loginUser)

module.exports = router
