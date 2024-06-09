
import { Op } from 'sequelize';
import model from './../models/index.js';
import Stripe from 'stripe'
import ApiError from '../utils/apiResponse.js';
import cartService from './cart.service.js';


const { Payment, Cart, Product } = model


const stripe = new Stripe('sk_test_51P5LRbHCIgRCYpOFfHFOMwmdwXzBMeCiASYLMgsbLJNGGXSh3kIPEOCs6uzYO2AX8BRmoqmY38B7XfbiOSgIJqor00G2dS5lqQ')


const getPayment = async (id) => {
    return await Payment.findByPk(id)
}

const getAllPayments = async (id) => {
    return await Payment.findAll({
        where: {
            userUserId: id
        }
    })
}

const addPayment = async (PaymentDto) => {
    return await Payment.create({ ...PaymentDto })
}

const updatePayment = async (updatePaymentDto, id) => {
    return await Payment.update(
        {
            ...updatePaymentDto
        }
        , {
            where: {
                payment_id: {
                    [Op.eq]: id
                }
            }
        })
}



const deletePayment = async (id) => {
    return await Payment.destroy({
        where: {
            payment_id: {
                [Op.eq]: id
            }
        }
    })
}


const webhookCheckout = async (req) => {
    let event;

    const header = req.headers['stripe-signature']

    const payload = req.rawBody

    const secret = 'whsec_mKAIywDSsFky5rSW6hS6jPYw122gOxBh'

    event = stripe.webhooks.constructEvent(payload, header, secret);

    switch (event.type) {
        case 'checkout.session.completed':
            const id = event.data.object.client_reference_id
            console.log(id)
            const cart = await cartService.getCart(id);

            cart.map(async (p) => {
                const productId = p.dataValues.product.dataValues.product_id
                const product = await Product.findByPk(productId)
                console.log(product)
            })

            return true
        default:
            return new ApiError(`Unhandled event type ${event.type}`, 400);
    }

}

const convertToCents = (price) => {
    return Math.round(parseFloat(price) * 100);
}



const createCheckoutSession = async (req) => {
    const id = req.user_id

    const cart = await cartService.getCart(id)

    if (!cart) {
        return new ApiError('Cart is Emety', 400)
    }

    const lineItems = cart.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.dataValues.product.dataValues.title,
                description: item.dataValues.product.dataValues.description,
            },
            unit_amount: convertToCents(item.dataValues.product.dataValues.price),
        },
        quantity: item.dataValues.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/orders`,
        cancel_url: `${req.protocol}://${req.get('host')}/cart`,
        client_reference_id: id
    });


    return session
}



const PaymentService = {
    getAllPayments,
    getPayment,
    addPayment,
    updatePayment,
    deletePayment,
    createCheckoutSession,
    webhookCheckout
}

export default PaymentService




