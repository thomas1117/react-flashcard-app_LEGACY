const jwt = require('jsonwebtoken')
const AuthService = require('../services/auth')

class AuthController {
    static async registerUser(req, res) {
        const newUser = await AuthService.createUser(req.body.email, req.body.password)
        if (!newUser) {
            res.status(400).json({message: 'user already exists'})
        }
        const { id, email } = newUser
        res.json({token: jwt.sign({id, email}, process.env.SECRET)})
    }

    static async loginUser(req, res) {
        const token = await AuthService.loginUser(req.body.email, req.body.password)
        if (!token) {
            res.status(400).json({message: 'invalid user or password'})
        }
        res.status(200).json(token)
    }
}

module.exports = AuthController