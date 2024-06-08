
import { Op } from 'sequelize';
import model from './../models/index.js';

const { Order, Order_Items, Product, Payment, Shipment, User } = model

const getOrder = async (id) => {
    return await Order.findByPk(req.params.id, {
        include: [User, Payment, Shipment, { model: Order_Items, include: [Product] }]
    });
}

const getAllOrders = async () => {
    return await Order.findAll({
        include: [User, Payment, Shipment, { model: Order_Items, include: [Product] }]
    });
}

const createOrder = async (orderDto, userId) => {
    const { order_date, totalPrice, paymentId, shipmentId, orderItems } = orderDto;

    // Create the order
    const order = await Order.create({
        order_date,
        totalOrderPrice: totalPrice,
        UserUserId: userId,
        PaymentPaymentId: paymentId,
        ShipmentShipmentId: shipmentId
    });

    // Create order items
    for (const item of orderItems) {
        await Order_Items.create({
            quantity: item.quantity,
            price: item.price,
            ProductProductId: item.productId,
            orderId: order.id
        });
    }

    return order
}


const updateOrder = async (updateOrderDto, id) => {
    return await Order.update(
        {
            ...updateOrderDto
        }
        , {
            where: {
                order_id: {
                    [Op.eq]: id
                }
            }
        })
}



const deleteOrder = async (id) => {
    return await Order.destroy({
        where: {
            order_id: {
                [Op.eq]: id
            }
        }
    })
}




const orderService = {
    createOrder,
    deleteOrder,
    getAllOrders,
    getOrder,
    updateOrder

}

export default orderService




