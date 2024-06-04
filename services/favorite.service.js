import { Op } from 'sequelize';
import model from './../models/index.js'
import ApiError from '../utils/apiResponse.js';
const Favorite = model.Favorite
const Product = model.Product


const addToFavorite = async (id) => {
    const isFounded = await Product.findByPk(id.productId)

    if (!isFounded) {
        return new ApiError('Product doesn\'t exist', 404)
    }

    const [product, created] = await Favorite.findOrCreate({
        where: {
            userId: id.userId,
            productProductId: id.productId
        },
        defaults: {
            userId: id.userId,
            productProductId: id.productId
        },
        attributes: {
            exclude: ['productProductId', 'userId']
        },
        include: {
            model: Product
        }
    })

    if (!created) {
        return new ApiError('Product already existed in favorite', 400)
    }

    return product
}

const removeFromFavorite = async (id) => {
    return await Favorite.destroy({
        where: {
            [Op.and]: [
                {
                    userId: {
                        [Op.eq]: id.userId
                    }
                },
                {
                    productProductId: {
                        [Op.eq]: id.productId
                    }
                }
            ]
        }
    })
}

const getFavorite = async (id) => {
    return await Favorite.findAll({
        where: {
            userId: {
                [Op.eq]: id
            }
        },
        attributes: {
            exclude: ['productProductId', 'userId']
        },
        include: {
            model: Product
        }
    })
}



const favoriteService = {
    addToFavorite,
    removeFromFavorite,
    getFavorite
}




export default favoriteService



