import sequelize from './../config/database_config.js'
import UserModel from './User.js'
import ProductModel from './Product.js'
import CartModel from './Cart.js'
import CategoryModel from './Category.js'
import FavoriteModel from './Favorite.js'
import OrderModel from './Order.js'
import Order_Items_Model from './Order_Items.js'
import PaymentModel from './Payment.js'
import ShipmentModel from './Shipment.js'
import ImageModel from './Image.js'




const User = UserModel(sequelize)
const Product = ProductModel(sequelize)
const Cart = CartModel(sequelize)
const Category = CategoryModel(sequelize)
const Favorite = FavoriteModel(sequelize)
const Payment = PaymentModel(sequelize)
const Shipment = ShipmentModel(sequelize)
/////////////////////////////////////////
const Order = OrderModel(sequelize)
const Order_Items = Order_Items_Model(sequelize)
const Image = ImageModel(sequelize)



Image.hasMany(Product, { foreignKey: 'image_id' });
Product.belongsTo(Image, { foreignKey: 'image_id' });

Category.hasMany(Product, {
    foreignKey: 'c_id'
});
Product.belongsTo(Category, {
    foreignKey: 'c_id'
});

Product.hasMany(Favorite);
Favorite.belongsTo(Product);

Product.hasMany(Cart);
Cart.belongsTo(Product);

// User.hasMany(Cart);
// Cart.belongsTo(User);

Product.hasMany(Order_Items);
Order_Items.belongsTo(Product);


User.hasMany(Order);
Order.belongsTo(User);

Payment.hasMany(Order),
    Order.belongsTo(Payment)

Shipment.hasMany(Order),
    Order.belongsTo(Shipment)




User.hasMany(Payment),
    Payment.belongsTo(User)

User.hasMany(Shipment),
    Shipment.belongsTo(User)



await sequelize.sync({ force: false })


const model = {
    User,
    Product,
    Cart,
    Category,
    Favorite,
    Order,
    Order_Items,
    Image,
    Shipment,
    Payment
}

export default model