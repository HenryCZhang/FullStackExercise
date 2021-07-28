const Sequelize = require('sequelize');
const config = require('../config');

const Orders = config.define('Orders',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    car_id: {
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    client_firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    client_lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    client_email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status:{
        type:Sequelize.STRING,
        allowNull: false
    }
},{timestamps:false});

module.exports = Orders;