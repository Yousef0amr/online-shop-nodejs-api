
import { Op } from 'sequelize';
import model from './../models/index.js';
import PaymentService from './payment.service.js';
import cartService from './cart.service.js';

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

const createCashOrder = async (event) => {
    const id = event.data.object.client_reference_id
    const shipmentId = event.data.object.metadata.shipmentId

    const cart = await cartService.getCart(id);

    const PaymentDto = {
        payment_date: Date.now(),
        payment_method: "card",
        amount: event.data.object.amount_total / 100,
        userUserId: id
    }

    const payment = await PaymentService.addPayment(PaymentDto);

    const orderDto = {
        order_date: Date.now(),
        totalOrderPrice: event.data.object.amount_total / 100,
        PaymentPaymentId: payment.payment_id,
        ShipmentShipmentId: shipmentId,
        UserUserId: id
    };

    const order = await Order.create(orderDto);

    cart.map(async (p) => {
        const productId = p.product.product_id

        await Order_Items.create({
            quantity: p.quantity,
            price: p.product.price,
            ProductProductId: productId,
            orderId: order.id
        });

        const product = await Product.findByPk(productId)
        product.stock -= p.quantity
        await product.save()
        const removeId = {
            userId: id,
            productId
        }
        await cartService.removeFromCart(removeId)
    })

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
    createCashOrder,
    deleteOrder,
    getAllOrders,
    getOrder,
    updateOrder

}

export default orderService




