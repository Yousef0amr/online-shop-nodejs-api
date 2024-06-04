import { Op } from 'sequelize';
import model from './../models/index.js'
import ApiError from '../utils/apiResponse.js';
const Product = model.Product
const Image = model.Image
const Category = model.Category

const addProduct = async (productDto) => {

    const isFounded = await Category.findByPk(productDto.data.c_id)

    if (!isFounded) {
        return new ApiError('Category not found', 404)
    }

    const image = await Image.create({
        image: productDto.image[0].buffer
    })

    return await Product.create({
        image_id: image.id,
        ...productDto.data
    });
}

const updateProduct = async (updateProductDto, id) => {
    return await Product.update(updateProductDto, {
        where: {
            [Op.eq]: id
        }
    })

}

const deleteProduct = async (id) => {
    return await Product.destroy({
        where: {
            [Op.eq]: id
        }
    })
}

const getProduct = async (id) => {
    return await Product.findByPk(id)
}

const getAllProducts = async () => {
    return await Product.findAll({
        include: [
            {
                model: Category,
            }
        ],
        attributes: { exclude: ['c_id'] }
    })
}



const productService = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts
}





export default productService