const sha512 = require('js-sha512')
const jwt = require('jsonwebtoken')
const db = require('../database/models')
const { User } = db
const { createSalt } = require('../database/utils/auth')

class AuthService {
    static async createUser(email, password) {
        const user = await User.findOne({where: {email}})
        if (user) {
            return null
        }
        const salt = createSalt()
        const u = {
            email: email,
            password: sha512(password + salt),
            salt
        }
        const newUser = await User.create(u)
        return newUser
    }

    static async loginUser(email, password) {
        const user = await User.findOne({where: {email}})
        if (!user) {
            return null
        }
        const hashedPassword = sha512(password + user.salt)
        if (user.password === hashedPassword) {
            return {token: jwt.sign({id: user.id, email: user.email}, process.env.SECRET)}
        } else {
            return null
        }
    }
}

module.exports = AuthService