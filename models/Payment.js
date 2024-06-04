import { DataTypes, Model } from "sequelize";

class Payment extends Model {

}



const PaymentModel = (sequelize) => Payment.init({
    payment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    payment_method: {
        type: DataTypes.ENUM(['card', 'cash']),
        allowNull: false,
        defaultValue: 'cash',
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize,
    modelName: "payments",
    timestamps: false
})



export default PaymentModel