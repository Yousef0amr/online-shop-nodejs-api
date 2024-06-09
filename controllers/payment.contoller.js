
import PaymentService from '../services/payment.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'


const createCheckoutSession = wrap(async (req, res, next) => {
    const callback = await PaymentService.createCheckoutSession(req)
    return callback.stack ? next(callback) : success(res, { session: callback }, 200)
})


const webhookCheckout = wrap(async (req, res, next) => {
    const callback = await PaymentService.webhookCheckout(req)
    return callback.stack ? next(callback) : success(res, { received: callback }, 200)
})


const updatePayment = wrap(async (req, res, next) => {
    const payment = await PaymentService.getPayment(req.params.id)
    if (!payment)
        return next(new ApiError('Payment not found', 404))
    const updatedPayment = await PaymentService.updatePayment(req.body, req.params.id)
    return success(res, { payment: updatedPayment }, 200)
})

const deletePayment = wrap(async (req, res, next) => {
    const payment = await PaymentService.getPayment(req.params.id)
    if (!payment)
        return next(new ApiError('Payment not found', 404))
    await PaymentService.deletePayment(req.params.id)
    return success(res, { payment }, 200)
})

const getPayment = wrap(async (req, res, next) => {
    const payment = await PaymentService.getPayment(req.params.id)
    if (!payment)
        return next(new ApiError('Payment not found', 404))
    return success(res, { payment }, 200)
})

const getAllPayments = wrap(async (req, res, next) => {
    const payments = await PaymentService.getAllPayments(req.user_id)
    return success(res, { payments }, 200)
})



export {
    updatePayment,
    deletePayment,
    getPayment,
    getAllPayments,
    createCheckoutSession,
    webhookCheckout
}

