import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('shopdatabasepg', 'shopdatabasepg_user', '0DXnAYzqB493G3IMWmZTdbhepGff7fbt', {
    host: 'dpg-cpgjndmct0pc739q85k0-a',
    port: 5432,
    dialect: 'postgres',
    logging: false
});

console.log(process.env)

export default sequelize





