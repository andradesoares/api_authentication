const JWT = require("jsonwebtoken")

const User = require("../models/user")

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const  { email, password, method } = req.value.body
      
      const existingUser = await User.findOne({ 'local.email': email })

      if(existingUser) {
        return res.status(400).json({ message: 'Error, email already in use' })
      }

      const newUser = new User({
        method: method,
        local: {
        email,
        password
        }
      })
      await newUser.save()

      const token = JWT.sign({
        iss: 'Api',
        sub: newUser._id,
        iat: Date.now () / 1000,
        exp: Math.floor (Date.now () / 1000) + ((60 * 60)*24)
      }, process.env.JWT_SECRET)

      res.status(200).json({ message: 'User created with success', newUser, jwt: token })
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error })
    }
  },
  signIn: async (req, res, next) => {
    try {
      const token = JWT.sign({
        iss: 'Api',
        sub: req.user._id,
        iat: Date.now () / 1000,
        exp: Math.floor (Date.now () / 1000) + ((60 * 60)*24)
      }, process.env.JWT_SECRET)
      const user = req.user
      
      res.status(200).json({message: 'User logged in with success', user, jwt: token })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error loggin user', error })
    }
  },
  googleAuth: async (req, res, next) => {
    try {
      const token = JWT.sign({
        iss: 'Api',
        sub: req.user._id,
        iat: Date.now () / 1000,
        exp: Math.floor (Date.now () / 1000) + ((60 * 60)*24)
      }, process.env.JWT_SECRET)

      const user = req.user
      
      res.status(200).json({ message: 'User logged in with success', user, jwt: token })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error loggin user', error })
    }
  },
  twitterAuth: async (req, res, next) => {
    try {
      const token = JWT.sign({
        iss: 'Api',
        sub: req.user._id,
        iat: Date.now () / 1000,
        exp: Math.floor (Date.now () / 1000) + ((60 * 60)*24)
      }, process.env.JWT_SECRET)

      const user = req.user
      
      res.status(200).json({ message: 'User logged in with success', user, jwt: token })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error loggin user', error })
    }
  },
  facebookAuth: async (req, res, next) => {
    try {
      const token = JWT.sign({
        iss: 'Api',
        sub: req.user._id,
        iat: Date.now () / 1000,
        exp: Math.floor (Date.now () / 1000) + ((60 * 60)*24)
      }, process.env.JWT_SECRET)

      const user = req.user
      
      res.status(200).json({ message: 'User logged in with success', user, jwt: token })
    } catch (error) {
      res.status(400).json({ message: 'Error loggin user', error })
    }
  }
}