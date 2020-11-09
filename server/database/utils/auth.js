const sha512 = require('js-sha512')

module.exports = {
    createSalt(len = 20) {
        const vals = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let str = ''
        for (let i = 0; i < len; i++) {
            const randomIndex = Math.floor(Math.random() * vals.length)
            str += vals.charAt(randomIndex)
        }
        return str
    },
    saltAndHash(password, salt) {
        return sha512(password + salt)
    }  
}