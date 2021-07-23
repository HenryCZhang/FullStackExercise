const Sequelize = require('sequelize');
// const config = new Sequelize('ionic-planner-app','root','13758981888Zc@',{dialect:'mysql'});

//DEVELOPMENT: local database
const environment = process.env.NODE_ENV || 'development';

let database = 'ionic-planner-app';
let username = 'root';
let password = '13758981888Zc@';
let host = "localhost";

//PRODUCTION : using Heroku remote database 
if(environment === 'production'){
    database = 'o8dxkdr4r8yor4r1';
    username = 'uvvp7sklgd8k2yku';
    password = 'pcmmv8of0txon45g';
    host = "kfgk8u2ogtoylkq9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
}

const config = new Sequelize(database,username,password,{host,dialect:'mysql'}
);

module.exports=config;