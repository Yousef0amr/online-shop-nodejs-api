
import { Op } from 'sequelize';
import model from './../models/index.js';
const { Shipment } = model

const getShipment = async (id) => {
    return await Shipment.findByPk(id)
}

const getAllShipments = async (id) => {
    return await Shipment.findAll({
        where: {
            userUserId: id
        }
    })
}

const addShipment = async (ShipmentDto) => {
    return await Shipment.create({ ...ShipmentDto })
}

const updateShipment = async (updateShipmentDto, id) => {
    return await Shipment.update(
        {
            ...updateShipmentDto
        }
        , {
            where: {
                shipment_id: {
                    [Op.eq]: id
                }
            },
            returning: true
        })
}



const deleteShipment = async (id) => {
    return await Shipment.destroy({
        where: {
            shipment_id: {
                [Op.eq]: id
            }
        }
    })
}


const ShipmentService = {
    getAllShipments,
    getShipment,
    addShipment,
    updateShipment,
    deleteShipment
}

export default ShipmentService




