import { Router, json } from "express";
import validateRequest from "../middlewares/validateRequest.js";
import { updatePaymentShema } from './../validators/payment.validator.js'
import { createCheckoutSession, deletePayment, getAllPayments, getPayment, updatePayment, webhookCheckout } from './../controllers/payment.contoller.js'

const paymentRouter = Router()


paymentRouter.route('/')
    .get(getAllPayments);

paymentRouter.route('/create-checkout-session')
    .post(createCheckoutSession)

paymentRouter.route('/webhook-checkout')
    .post(webhookCheckout)


paymentRouter.route('/:id')
    .get(getPayment)
    .patch(validateRequest(updatePaymentShema), updatePayment)
    .delete(deletePayment);

export default paymentRouter