import Joi from 'joi'

const decimal = Joi.alternatives()
  .try(Joi.number(), Joi.string().pattern(/^\d+(\.\d+)?$/))
  .messages({
    'alternatives.match': 'Value must be a valid decimal',
    'string.pattern.base': 'Value must be a valid decimal',
    'number.base': 'Value must be a number'
  })

const createProductSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
    'any.required': 'Title is required'
  }),

  description: Joi.string().trim().allow(null, '').messages({
    'string.base': 'Description must be a string'
  }),
  price: decimal.required().messages({
    'any.required': 'Price is required'
  }),
})

const updateProductSchema = Joi.object({
  title: Joi.string().trim().optional().messages({
    'string.base': 'Title must be a string'
  }),

  description: Joi.string().trim().allow(null, '').optional().messages({
    'string.base': 'Description must be a string'
  }),

  price: decimal.messages({
    'alternatives.match': 'Price must be a valid decimal'
  }),
})

export { createProductSchema, updateProductSchema }
