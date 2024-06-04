
import { Op } from 'sequelize';
import model from './../models/index.js';

const { Order } = model

const getOrder = async (id) => {

}

const getAllOrders = async () => {

}

const createOrder = async (orderDto) => {

}

const updateOrder = async (updateOrderDto, id) => {

}



const deleteOrder = async (id) => {

}


const orderService = {
    createOrder,
    deleteOrder,
    getAllOrders,
    getOrder,
    updateOrder

}

export default orderService




