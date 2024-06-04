import Joi from 'joi'


const registerSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    address: Joi.string().required(),
    phone_number: Joi.string().min(10).max(11).required(),
    role: Joi.string().valid('User', 'Admin').optional()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const refreshSchema = Joi.object({
    refreshToken: Joi.string().required()
})

const checkEmailSchema = Joi.object({
    email: Joi.string().email().required()
})

const verifyEmailSchema = Joi.object({
    secret: Joi.string().required(),
    token: Joi.string().length(6).required()
})

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    newPassword: Joi.string().required()
})


const changePasswordSchema = Joi.object({
    newPassword: Joi.string().required(),
    oldPassword: Joi.string().required()
})



export {
    registerSchema,
    loginSchema,
    refreshSchema,
    checkEmailSchema,
    verifyEmailSchema,
    resetPasswordSchema,
    changePasswordSchema
}