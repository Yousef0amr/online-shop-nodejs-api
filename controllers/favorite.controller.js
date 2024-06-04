import ApiError, { success } from '../utils/apiResponse.js';
import favoriteService from '../services/favorite.service.js';
import wrap from 'express-async-wrap'

const addToFavorite = wrap(async (req, res, next) => {
    const userId = req.user_id;
    const productId = req.params.id

    const callback = await favoriteService.addToFavorite({ userId, productId })

    return callback.stack ? next(callback) : success(res, { favorite: callback }, 201, 'item added to favorite')
})
const removeFromFavorite = wrap(async (req, res, next) => {
    const userId = req.user_id;
    const productId = req.params.id
    const callback = await favoriteService.removeFromFavorite({ userId, productId })
    if (callback !== 0) {
        const favorite = await favoriteService.getFavorite(userId)
        return success(res, { favorite })
    }
    return next(new ApiError('Product not in favorite list', 404))
})

const getFavorite = wrap(async (req, res, next) => {
    const userId = req.user_id;
    const favorite = await favoriteService.getFavorite(userId)
    return success(res, { favorite })
})



export {
    addToFavorite,
    removeFromFavorite,
    getFavorite
}



