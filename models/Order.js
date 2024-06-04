import { DataTypes, Model } from "sequelize";

class Order extends Model {

}



const OrderModel = (sequelize) => Order.init({
    order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    totalOrderPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "orders",
    timestamps: false
})



export default OrderModel