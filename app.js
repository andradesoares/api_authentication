const express = require('express')
const morgan = require('morgan')
const session = require('express-session');

require('dotenv').config()

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

//Routes
app.use('/user', require('./routes/user'))

module.exports = app
