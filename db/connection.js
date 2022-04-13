require("dotenv").config()
const mongoose = require('mongoose')

const preProdConfig = {
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbPort: process.env.DB_PORT,
}

const prodConfig = {
    dbHost: process.env.PROD_DB_HOST,
    dbName: process.env.PROD_DB_NAME,
    dbUser: process.env.PROD_DB_USER,
    dbPassword: process.env.PROD_DB_PASSWORD,
    dbPort: process.env.DB_PORT,
}

let preProdDbUrl = `mongodb://${preProdConfig.dbUser}:${preProdConfig.dbPassword}@${preProdConfig.dbHost}:${preProdConfig.dbPort}/${preProdConfig.dbName}?authSource=expertrons`

let prodDbUrl = `mongodb://${prodConfig.dbUser}:${prodConfig.dbPassword}@${prodConfig.dbHost}:${prodConfig.dbPort}/${prodConfig.dbName}?authSource=expertrons`

const preProd = mongoose.createConnection(preProdDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

const prod = mongoose.createConnection(prodDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
preProd.model('mentorVideo', require('./model/mentorVideo'))
prod.model('mentorVideo', require('./model/mentorVideo'))
module.exports = { preProd, prod }