import { DataTypes, Model } from "sequelize";

class Cart extends Model {

}



const CartModel = (sequelize) => Cart.init({
    cart_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
}, {
    sequelize,
    modelName: "carts",
    timestamps: false
})



export default CartModel