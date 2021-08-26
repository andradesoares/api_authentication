const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const User = require('../models/user')

passport.use('local', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async ( email, password, done) => {
  try {
    const user = await User.findOne({ 'local.email': email })
    if (!user) return done(null, false)
    
    const isValid = await user.validatePassword(password)
    if (!isValid ) return done(null, false)

    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    return done(null, user)
  } catch (error) {
    return done(error, null)
  }
})