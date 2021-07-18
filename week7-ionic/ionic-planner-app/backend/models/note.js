const Sequelize =  require('sequelize');
const config = require('../config');

const Note = config.define("Notes", {
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
    header: {
        type: Sequelize.STRING,
        allowNull: false
    },
    details: {
    type: Sequelize.STRING,
        allowNull: false
    },
    importance: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{timestamps:false});

module.exports = Note;