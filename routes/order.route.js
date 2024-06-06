import express from 'express'
import validateRequest from '../middlewares/validateRequest.js';


const orderRouter = express.Router()


orderRouter.route('/')
    .post(validateRequest(addOrderSchema), addOrder)
    .get(getAllOrders);


orderRouter.route('/:id')
    .get(getOrder)
    .patch(validateRequest(addOrderSchema), updateOrder)
    .delete(deleteOrder);



export default orderRouter