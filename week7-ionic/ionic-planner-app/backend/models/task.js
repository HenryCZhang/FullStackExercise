const Sequelize =  require('sequelize');
const config = require('../config');

const Task = config.define("Task", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_of_start: {
        type: Sequelize.DATE,
        allowNull: false
    },
    date_of_end: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true
    } 
},{timestamps:false});

module.exports = Task;