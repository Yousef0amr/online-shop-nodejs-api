import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";
import validateRequset from "../middlewares/validateRequest.js";
import Joi from "joi";

const addCartSchema = Joi.object({
    quantity: Joi.number().required()
})


const cartRouter = Router()


cartRouter.route('/')
    .get(getCart)
cartRouter.route('/:id')
    .post(validateRequset(addCartSchema), addToCart)
    .delete(removeFromCart);


export default cartRouter