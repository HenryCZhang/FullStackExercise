const Sequelize = require('sequelize');
const config = require('../config');

const Lessor = config.define('Lessors',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    order_id:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
},{timestamps:false});

module.exports = Lessor;