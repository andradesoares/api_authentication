const express = require('express')
const morgan = require('morgan')
const session = require('express-session');
const passport = require("passport")

require('dotenv').config()
require('./config/passport-jwt')
require('./config/passport-local')
require('./config/passport-google')
require('./config/passport-twitter')
require('./config/passport-facebook')

const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'apiaunthentication',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize())

//Routes
app.use('/user', require('./routes/user'))

module.exports = app
