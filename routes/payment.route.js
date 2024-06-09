import { json, raw, Router } from "express";
import validateRequest from "../middlewares/validateRequest.js";
import { addPaymentSchema, updatePaymentShema } from './../validators/payment.validator.js'
import { addPayment, createCheckoutSession, deletePayment, getAllPayments, getPayment, updatePayment, webhookCheckout } from './../controllers/payment.contoller.js'
const paymentRouter = Router()


paymentRouter.route('/')
    .post(validateRequest(addPaymentSchema), addPayment)
    .get(getAllPayments);

paymentRouter.route('/create-checkout-session')
    .post(createCheckoutSession)

paymentRouter.route('/webhook-checkout')
    .post((req, res) => {
        console.log(req)
        res.json(req.body)
    }, webhookCheckout)


paymentRouter.route('/:id')
    .get(getPayment)
    .patch(validateRequest(updatePaymentShema), updatePayment)
    .delete(deletePayment);

export default paymentRouter