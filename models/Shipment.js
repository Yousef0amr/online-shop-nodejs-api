import { Model, DataTypes } from "sequelize";

class Shipment extends Model {

}



const ShipmentModel = (sequelize) => Shipment.init({
    shipment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    shipment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    zip_code: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "shipments",
    timestamps: false
})



export default ShipmentModel