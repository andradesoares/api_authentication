const joi = require('joi')

module.exports = {
  validadeBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body)

      if(result.error) {
        return res.status(400).json({ message: result.error.details[0].message })
      }

      if(!req.value) {
        req.value = {}
      }

      req.value['body'] = result.value

      next()
    }
  },

  schemas: {
    authSchema: joi.object().keys({
      method: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
  }
}