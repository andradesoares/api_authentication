const passport  = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')

const User = require('../models/user')

passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub)

    if(!user) {
      return (done, false)
    }

    done(null, user)
  } catch (error) {
    done(error, false)
  }
}))