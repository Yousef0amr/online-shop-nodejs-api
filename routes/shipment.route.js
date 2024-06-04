import { Router } from "express";
import validateRequest from "../middlewares/validateRequest.js";
import { addShipmentSchema, updateShimentShema } from './../validators/shipment.validator.js'
import { addShipment, deleteShipment, getAllShipments, getShipment, updateShipment } from './../controllers/shipment.controller.js'
const shipmentRouter = Router()


shipmentRouter.route('/')
    .post(validateRequest(addShipmentSchema), addShipment)
    .get(getAllShipments);


shipmentRouter.route('/:id')
    .get(getShipment)
    .patch(validateRequest(updateShimentShema), updateShipment)
    .delete(deleteShipment);

export default shipmentRouter