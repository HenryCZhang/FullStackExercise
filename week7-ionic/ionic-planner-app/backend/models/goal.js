const Sequelize =  require('sequelize');
const config = require('../config');

const Goal = config.define("Goal", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true
    } 
},{timestamps:false});

module.exports = Goal;