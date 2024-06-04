import { Model, DataTypes } from "sequelize";

class Order_Items extends Model {

}



const Order_ItemsModel = (sequelize) => Order_Items.init({
    order_item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'orders',
            key: 'order_id'
        }
    }
}, {
    sequelize,
    modelName: "orderItems",
    timestamps: false
})



export default Order_ItemsModel