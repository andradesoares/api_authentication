const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/user')

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "https://localhost:4000/user/auth/facebook/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {  
    console.log(profile)
  } catch (err) {
    done(err, false, err.message)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

