import Joi from "joi";

const addPaymentSchema = Joi.object({
    payment_date: Joi.string().required(),
    payment_method: Joi.string().optional(),
    amount: Joi.number().required(),
})


const updatePaymentShema = Joi.object({
    payment_date: Joi.string().optional(),
    payment_method: Joi.string().optional(),
    amount: Joi.number().optional(),
})











export {
    addPaymentSchema,
    updatePaymentShema
}