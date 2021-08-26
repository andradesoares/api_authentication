const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const User = require('../models/user')

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  includeEmail: true,
  callbackURL: "http://localhost:4000/user/auth/twitter/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile)
    const  existingUser = await User.findOne({ 'twitter.id': profile.id})
    if(existingUser) {
      return done(null, existingUser)
    }

    const newUser = new User({
      method: 'twitter',
      twitter: {
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

