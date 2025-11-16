import Joi from 'joi'

const registerSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.base': 'username must be string',
    'string.empty': 'username should not be empty',
    'string.min': 'username must be at least 3 character'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'email must be valid email.',
    'string.empty': 'email should not be empty'
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'password must be string',
    'string.min': 'password must br at least 6 character',
    'string.empty': 'password should not be empty'
  })
})

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'email must be valid email.',
    'string.empty': 'email should not be empty'
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'password must be string',
    'string.min': 'password must br at least 6 character',
    'string.empty': 'password should not be empty'
  })
})

const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).optional().messages({
    'string.base': 'username must be string',
    'string.min': 'username must be at least 3 character'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'email must be valid email.'
  }),
  password: Joi.string().min(6).optional().messages({
    'string.base': 'password must be string',
    'string.min': 'password must br at least 6 character'
  })
})

export { registerSchema, loginSchema, updateProfileSchema }
