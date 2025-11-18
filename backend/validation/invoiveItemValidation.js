import Joi from 'joi'

const decimal = Joi.alternatives()
  .try(Joi.number(), Joi.string().pattern(/^\d+(\.\d+)?$/))
  .messages({
    'alternatives.match': 'Value must be a valid decimal',
    'string.pattern.base': 'Value must be a valid decimal',
    'number.base': 'Value must be a number'
  })

const createInvoiceItemSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
    'any.required': 'Title is required'
  }),

  description: Joi.string().trim().allow(null, '').messages({
    'string.base': 'Description must be a string'
  }),

  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required'
  }),

  price: decimal.required().messages({
    'any.required': 'Price is required'
  }),

  total: decimal.messages({
    'alternatives.match': 'Total must be a valid decimal'
  })
})

const updateInvoiceItemSchema = Joi.object({
  title: Joi.string().trim().optional().messages({
    'string.base': 'Title must be a string'
  }),

  description: Joi.string().trim().allow(null, '').optional().messages({
    'string.base': 'Description must be a string'
  }),

  quantity: Joi.number().integer().min(1).optional().messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1'
  }),

  price: decimal.messages({
    'alternatives.match': 'Price must be a valid decimal'
  }),

  total: decimal.messages({
    'alternatives.match': 'Total must be a valid decimal'
  })
})

export { createInvoiceItemSchema, updateInvoiceItemSchema }
