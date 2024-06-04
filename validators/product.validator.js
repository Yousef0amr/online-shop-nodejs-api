import Joi from 'joi'
import fileSchema from '../utils/file-schema.js'

const addProductSchema = Joi.object({
    title: Joi.string().required(),
    sku: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    c_id: Joi.number().required(),
})


const updateProductSchema = Joi.object({
    title: Joi.string().optional(),
    sku: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
    stock: Joi.number().optional(),
    c_id: Joi.number().optional(),
})







export {
    addProductSchema,
    updateProductSchema
}