const express = require('express');

const IndexController = require('../controllers/User');
const { validadeBody, schemas } = require('../helpers/routeHelpers');

const Router = express.Router();

Router.route('/')
  .post(validadeBody(schemas.authSchema), IndexController.signUp)

module.exports = Router