import cartService from '../services/cart.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'


const addToCart = wrap(async (req, res, next) => {
    const userId = req.user_id;
    const productId = req.params.id

    const callback = await cartService.addToCart(req.body, { userId, productId })

    return callback.stack ? next(callback) : success(res, { cart: callback }, 201, 'item added to cart')
})

const removeFromCart = wrap(async (req, res, next) => {
    const userId = req.user_id;
    const productId = req.params.id

    const callback = await cartService.removeFromCart({ userId, productId })

    if (callback !== 0) {
        const cart = await cartService.getCart(userId)
        return success(res, { cart })
    }

    return next(new ApiError('Product not in favorite list', 404))

})

const getCart = wrap(async (req, res, next) => {
    const userId = req.user_id;

    const cart = await cartService.getCart(userId)

    return success(res, { totalPrice: cart.totalPrice, cart })
})



export {
    addToCart,
    removeFromCart,
    getCart
}