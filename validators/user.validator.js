import Joi from 'joi'




const updateUserSchema = Joi.object({
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    address: Joi.string().optional(),
    phone_number: Joi.string().min(10).max(11).optional()
})







export {
    updateUserSchema
}