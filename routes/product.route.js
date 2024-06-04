import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller.js";
import validateRequset from "../middlewares/validateRequest.js";
import { addProductSchema, updateProductSchema } from './../validators/product.validator.js'
import multerConfig from "./../utils/multer.js";

const productRouter = Router()


productRouter.route('/')
    .post(multerConfig().fields([
        {
            name: 'image',
            maxCount: 1
        }
    ]), validateRequset(addProductSchema), addProduct)
    .get(getAllProducts);


productRouter.route('/:id')
    .get(getProduct)
    .patch(validateRequset(updateProductSchema), updateProduct)
    .delete(deleteProduct);






export default productRouter