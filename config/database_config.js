import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('onlineShop', 'postgres', 'root', {
    host: 'localhost',
    port: 4000,
    dialect: 'postgres',
    logging: false
});



export default sequelize





