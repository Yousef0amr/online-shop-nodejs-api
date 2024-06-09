import { Op } from 'sequelize';
import model from './../models/index.js'
import ApiError from '../utils/apiResponse.js';

const Cart = model.Cart
const Product = model.Product


const addToCart = async (cartDto, id) => {
    const product = await Product.findByPk(id.productId)
    if (!product)
        return new ApiError('product does\'t  exist', 404)

    const [cartItem, created] = await Cart.findOrCreate({
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
        },
        defaults: {
            quantity: cartDto.quantity,
            userId: id.userId,
            productProductId: id.productId
        }
    })

    if (!created) {
        cartItem.quantity += +cartDto.quantity
        await cartItem.save()
    }

    return cartItem
}

const removeFromCart = async (id) => {
    return await Cart.destroy({
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        {
                            userId: {
                                [Op.eq]: id.userId
                            }
                        }
                    ]

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

const getCart = async (id) => {
    const cart = await Cart.findAll({
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
    const totalPrice = await calcTotalCartPrice(cart)
    cart.totalPrice = totalPrice

    return cart
}


const calcTotalCartPrice = async (cart) => {
    let sum = 0
    await cart.map((ele) => {
        sum += (+ele.product.price) * (ele.quantity)
    })
    return sum
}


const cartService = {
    addToCart,
    removeFromCart,
    getCart
}


export default cartService



