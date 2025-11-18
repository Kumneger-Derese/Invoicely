import Joi from 'joi'

const invoiceStatusEnum = ['draft', 'sent', 'paid', 'overdue', 'cancelled']
const paymentStatusEnum = ['unpaid', 'partiallyPaid', 'paid']
const paymentMethodEnum = ['cash', 'bank', 'chapa']

const createInvoiceSchema = Joi.object({
  invoiceNumber: Joi.string().trim().required().messages({
    'string.base': 'Invoice number must be a string',
    'string.empty': 'Invoice number is required',
    'any.required': 'Invoice number is required'
  }),

  status: Joi.string()
    .valid(...invoiceStatusEnum)
    .default('draft')
    .messages({
      'any.only': 'Invalid invoice status',
      'string.base': 'Invoice status must be a string'
    }),

  title: Joi.string().trim().required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
    'any.required': 'Title is required'
  }),

  notes: Joi.string().trim().allow(null, '').messages({
    'string.base': 'Notes must be a string'
  }),

  totalAmount: Joi.number().messages({
    'number.base': 'Total amount must be a number'
  }),

  subTotal: Joi.number().messages({
    'number.base': 'Subtotal must be a number'
  }),

  taxRate: Joi.number().integer().min(0).messages({
    'number.base': 'Tax rate must be a number',
    'number.integer': 'Tax rate must be an integer',
    'number.min': 'Tax rate must be at least 0'
  }),

  discountRate: Joi.number().integer().min(0).messages({
    'number.base': 'Discount rate must be a number',
    'number.integer': 'Discount rate must be an integer',
    'number.min': 'Discount rate must be at least 0'
  }),

  currency: Joi.string().trim().required().messages({
    'string.base': 'Currency must be a string',
    'string.empty': 'Currency is required',
    'any.required': 'Currency is required'
  }),

  paymentStatus: Joi.string()
    .valid(...paymentStatusEnum)
    .default('unpaid')
    .messages({
      'string.base': 'Payment status must be a string',
      'any.only': 'Invalid payment status'
    }),

  paymentMethod: Joi.string()
    .valid(...paymentMethodEnum)
    .default('bank')
    .messages({
      'string.base': 'Payment method must be a string',
      'any.only': 'Invalid payment method'
    }),

  issueDate: Joi.date().required().messages({
    'date.base': 'Issue date must be a valid date',
    'any.required': 'Issue date is required'
  }),

  dueDate: Joi.date().required().messages({
    'date.base': 'Due date must be a valid date',
    'any.required': 'Due date is required'
  })
})

const updateInvoiceSchema = Joi.object({
  invoiceNumber: Joi.string().trim().messages({
    'string.base': 'Invoice number must be a string'
  }),

  status: Joi.string()
    .valid(...invoiceStatusEnum)
    .messages({
      'string.base': 'Invoice status must be a string',
      'any.only': 'Invalid invoice status'
    }),

  title: Joi.string().trim().messages({
    'string.base': 'Title must be a string'
  }),

  notes: Joi.string().trim().allow(null, '').messages({
    'string.base': 'Notes must be a string'
  }),

  totalAmount: Joi.number().messages({
    'number.base': 'Total amount must be a number'
  }),

  subTotal: Joi.number().messages({
    'number.base': 'Subtotal must be a number'
  }),

  taxRate: Joi.number().integer().min(0).messages({
    'number.base': 'Tax rate must be a number',
    'number.integer': 'Tax rate must be an integer',
    'number.min': 'Tax rate must be at least 0'
  }),

  discountRate: Joi.number().integer().min(0).messages({
    'number.base': 'Discount rate must be a number',
    'number.integer': 'Discount rate must be an integer',
    'number.min': 'Discount rate must be at least 0'
  }),

  currency: Joi.string().trim().messages({
    'string.base': 'Currency must be a string'
  }),

  paymentStatus: Joi.string()
    .valid(...paymentStatusEnum)
    .messages({
      'string.base': 'Payment status must be a string',
      'any.only': 'Invalid payment status'
    }),

  paymentMethod: Joi.string()
    .valid(...paymentMethodEnum)
    .messages({
      'string.base': 'Payment method must be a string',
      'any.only': 'Invalid payment method'
    }),

  userId: Joi.string().uuid().messages({
    'string.base': 'User ID must be a string',
    'string.guid': 'User ID must be a valid UUID'
  }),

  clientId: Joi.string().uuid().messages({
    'string.base': 'Client ID must be a string',
    'string.guid': 'Client ID must be a valid UUID'
  }),

  issueDate: Joi.date().messages({
    'date.base': 'Issue date must be a valid date'
  }),

  dueDate: Joi.date().messages({
    'date.base': 'Due date must be a valid date'
  })
})

export { createInvoiceSchema, updateInvoiceSchema }
