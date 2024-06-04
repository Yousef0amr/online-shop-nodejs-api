import Joi from "joi";

const addShipmentSchema = Joi.object({
    shipment_date: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zip_code: Joi.number().required(),
})


const updateShimentShema = Joi.object({
    shipment_date: Joi.string().optional(),
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    zip_code: Joi.number().optional(),
})











export {
    addShipmentSchema,
    updateShimentShema
}