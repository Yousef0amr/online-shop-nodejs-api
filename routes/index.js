import { Router } from "express";
import categoryRouter from "./category.route.js";
import productRouter from "./product.route.js";
import favoriteRouter from "./favorite.route.js";
import cartRouter from "./cart.route.js";
import multerConfig from "../utils/multer.js";
import userRouter from "./user.route.js";
import shipmentRouter from "./shipment.route.js";
import paymentRouter from "./payment.route.js";
// import orderRouter from "./order.route.js";
import endpoints from "../utils/endoints.js";




const mainRouter = Router()

mainRouter.use(endpoints.CATEGORY, multerConfig().array(''), categoryRouter)
mainRouter.use(endpoints.PRODUCT, productRouter)
mainRouter.use(endpoints.FAVORITE, favoriteRouter)
mainRouter.use(endpoints.CART, multerConfig().array(''), cartRouter)
mainRouter.use(endpoints.USER, multerConfig().array(''), userRouter)
mainRouter.use(endpoints.SHIPMENT, multerConfig().array(''), shipmentRouter)

mainRouter.use(endpoints.PAYMENT, multerConfig().array(''), paymentRouter)
// mainRouter.use(endpoints.ORDER, multerConfig().array(''), orderRouter)



export default mainRouter