import Joi from 'joi'

const createClientSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.base": "client name must be a string",
        "string.empty": 'client name is required',
        "any.required": "client name is required",
        "string.min": 'client name should be at least 3 characters',
    }),
    email: Joi.string().email().required().messages({
        "string.base": "client email must be a string",
        "string.email": 'client email must be valid email',
        "any.required": "client email is required",
    }),
    phone: Joi.string().required().messages({
        "string.base": "client phone number must be a string",
        "any.required": "client phone number is required",
    }),
    address: Joi.object({
        city: Joi.string().required().messages({
            "string.base": "client city must be a string",
            "any.required": "client city is required",
        }),
        country: Joi.string().required().messages({
            "string.base": "client country must be a string",
            "any.required": "client country is required",
        }),
        post: Joi.number().min(4).required().messages({
            "string.base": "client postal code must be a string",
            "string.min": 'client postal code should be at least 4 characters',
            "any.required": "client postal code is required",
        }),
        street: Joi.string().required().messages({
            "string.base": "client street must be a string",
            "any.required": "client street is required",
        })
    })
})

const updateClientSchema = Joi.object({
    name: Joi.string().min(3).optional().messages({
        "string.base": "client name must be a string",
        "string.min": 'client name should be at least 3 characters',
    }),
    email: Joi.string().email().optional().messages({
        "string.base": "client email must be a string",
        "string.email": 'client email must be valid email',
    }),
    phone: Joi.string().optional().messages({
        "string.base": "client phone number must be a string",
    }),
    address: Joi.object({
        city: Joi.string().optional().messages({
            "string.base": "client city must be a string",
        }),
        country: Joi.string().optional().messages({
            "string.base": "client country must be a string",
        }),
        post: Joi.number().min(4).optional().messages({
            "string.base": "client postal code must be a string",
            "string.min": 'client postal code should be at least 4 characters',
        }),
        street: Joi.string().optional().messages({
            "string.base": "client street must be a string",
        })
    })
})

export {createClientSchema,updateClientSchema}