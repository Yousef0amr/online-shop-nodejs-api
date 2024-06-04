
import { Op } from 'sequelize';
import model from './../models/index.js';
import Stripe from 'stripe'
import ApiError from '../utils/apiResponse.js';
import cartService from './cart.service.js';

const { Payment } = model


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
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log(err)
        return;
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            console.log(checkoutSessionCompleted)
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
}


const createCheckoutSession = async (req) => {
    const id = req.user_id

    const cart = await cartService.getCart(id)
    console.log(cart.totalPrice)
    if (!cart) {
        return new ApiError('Cart is Emety', 400)
    }
    // const session = await stripe.checkout.sessions.create({
    //     line_items: [
    //         {
    //             price_data: {
    //                 currency: 'usd',
    //                 product_data: {
    //                     name: 'T-shirt',
    //                     description: 'Comfortable cotton t-shirt',
    //                     images: ['https://example.com/t-shirt.png'],
    //                 },
    //                 unit_amount: 2000,

    //             },
    //             quantity: 1,
    //         },
    //     ],
    //     mode: 'payment',
    //     success_url: `${req.protocol}://${req.get('host')}/orders`,
    //     cancel_url: `${req.protocol}://${req.get('host')}/cart`,
    // });


    return cart
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




