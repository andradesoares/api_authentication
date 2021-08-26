const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy

const User = require('../models/user')

passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  scope: ['profile', 'email'],
  callbackURL: 'http://localhost:4000/user/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {      
    const  existingUser = await User.findOne({ 'google.id': profile.id})
    if(existingUser) {
      return done(null, existingUser)
    }

    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value
      }
    })
    await newUser.save()
    done(null, newUser)
  } catch (err) {
    console.log(err)
    done(err, false, err.message)
  }
}))


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});