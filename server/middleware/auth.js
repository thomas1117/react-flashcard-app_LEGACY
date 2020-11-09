const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const header = req.headers.authorization
    if (!header) {
      res.status(400).json({message: 'no token provided'})
    }
    if (header) {
      try {
        const token = header.split(' ')[1]
        try {
          jwt.verify(token, process.env.SECRET)
        } catch (error) {
          res.status(400).json({message: 'invalid token'})
        }
      } catch (error) {
        next()
      }
    }
    next()
  }

  module.exports = auth