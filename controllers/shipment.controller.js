
import ShipmentService from '../services/shipment.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'

const addShipment = wrap(async (req, res, next) => {
    const ShipmentDto = {
        ...req.body,
        userUserId: req.user_id
    }
    const shipment = await ShipmentService.addShipment(ShipmentDto)
    return success(res, { shipment }, 201, 'Shipment created successfully')
})

const updateShipment = wrap(async (req, res, next) => {
    const shipment = await ShipmentService.getShipment(req.params.id)
    if (!shipment)
        return next(new ApiError('Shipment not found', 404))
    const updatedShipment = await ShipmentService.updateShipment(req.body, req.params.id)
    return success(res, { shipment: updatedShipment[1] }, 200)
})

const deleteShipment = wrap(async (req, res, next) => {
    const shipment = await ShipmentService.getShipment(req.params.id)
    if (!shipment)
        return next(new ApiError('Shipment not found', 404))
    await ShipmentService.deleteShipment(req.params.id)
    return success(res, [], 200)
})

const getShipment = wrap(async (req, res, next) => {
    const shipment = await ShipmentService.getShipment(req.params.id)
    if (!shipment)
        return next(new ApiError('Shipment not found', 404))
    return success(res, { shipment }, 200)
})

const getAllShipments = wrap(async (req, res, next) => {
    const shipments = await ShipmentService.getAllShipments(req.user_id)
    return success(res, { shipments }, 200)
})



export {
    addShipment,
    updateShipment,
    deleteShipment,
    getShipment,
    getAllShipments
}

