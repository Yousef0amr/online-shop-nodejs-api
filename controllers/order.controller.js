
import orderService from '../services/order.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'

const createOrder = wrap(async (req, res, next) => {
    const order = await orderService.createOrder(req.body)
    return success(res, { order }, 201, 'order created successfully')
})

const updateOrder = wrap(async (req, res, next) => {
    const order = await orderService.updateOrder(req.body, req.params.id)

    return success(res, { order }, 200)
})

const deleteOrder = wrap(async (req, res, next) => {
    const order = await orderService.deleteOrder(req.params.id)
    return success(res, { order }, 200)
})

const getOrder = wrap(async (req, res, next) => {
    const order = await orderService.getOrder(req.params.id)
    if (!order)
        return next(new ApiError('order not found', 404))
    return success(res, { order }, 200)
})

const getAllOrders = wrap(async (req, res, next) => {
    const orders = await orderService.getAllOrders()
    return success(res, { orders }, 200)
})



export {
    createOrder,
    getAllOrders,
    getOrder,
    deleteOrder,
    updateOrder
}

