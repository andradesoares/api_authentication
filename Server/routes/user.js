const express = require('express');
const passport = require('passport')

const IndexController = require('../controllers/User');
const { validadeBody, schemas } = require('../helpers/routeHelpers');

const Router = express.Router();

Router.route('/signup')
  .post(
    validadeBody(schemas.authSchema), 
    IndexController.signUp
  )

Router.route('/signin')
  .post(
    validadeBody(schemas.authSchema),
    passport.authenticate('local',  {session: false }),
    IndexController.signIn
  )

Router.route('/auth/google')
  .get( 
    passport.authenticate('google', { scope: ['profile', 'email'] })
    )

Router.route('/auth/google/callback')
  .get( 
    passport.authenticate('google', {session: false}), 
    IndexController.googleAuth
  );

Router.route('/auth/twitter')
  .get(
    passport.authenticate('twitter', { scope: ['profile', 'email']})
  );

Router.route('/auth/twitter/callback')
  .get(
    passport.authenticate('twitter'), 
    IndexController.twitterAuth
  )

Router.route('/auth/facebook')
  .get(
    passport.authenticate('facebook')
  );

Router.route('/auth/facebook/callback')
  .get(
    passport.authenticate('facebook'), 
    IndexController.facebookAuth
  )

module.exports = Router