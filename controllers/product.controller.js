import productService from "../services/product.service.js";
import ApiError, { success } from "../utils/apiResponse.js";
import wrap from 'express-async-wrap'

const addProduct = wrap(async (req, res, next) => {
    const callback = await productService.addProduct({
        image: req.files.image,
        data: req.body
    })

    return callback.stack ? next(callback) : success(res, { product: callback }, 201, 'product created successfully')
})

const updateProduct = wrap(async (req, res, next) => {
    const product = await productService.updateProduct(req.body, req.params.id)

    return success(res, { product })
})

const deleteProduct = wrap(async (req, res, next) => {
    const callback = await productService.deleteProduct(req.params.id)

    return callback !== 0 ? success(res, { product }) : next(new ApiError('product not found', 404))
})

const getProduct = wrap(async (req, res, next) => {
    const product = await productService.getProduct(req.params.id)
    if (!product)
        return next(new ApiError('product not found', 404))
    return success(res, { product })
})

const getAllProducts = wrap(async (req, res, next) => {
    const products = await productService.getAllProducts()
    return success(res, { products })
})



export {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts
}
