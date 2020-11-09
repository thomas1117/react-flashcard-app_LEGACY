const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    return done(null, jwt_payload)
}))
module.exports = passport.authenticate('jwt', {session: false})