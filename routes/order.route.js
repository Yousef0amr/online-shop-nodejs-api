import express from 'express'
import validateRequest from '../middlewares/validateRequest.js';
import { deleteOrder, getAllOrders, getOrder, updateOrder } from './../controllers/order.controller.js'

const orderRouter = express.Router()


orderRouter.route('/')
    .get(getAllOrders);

orderRouter.route('/:id')
    .get(getOrder)
    .patch(updateOrder)
    .delete(deleteOrder);



export default orderRouter