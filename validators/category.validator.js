import Joi from "joi";

const addCategorySchema = Joi.object({
    name: Joi.string().required().min(3).max(15)
})











export {
    addCategorySchema
}