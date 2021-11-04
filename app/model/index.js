const dbConfig = require('../config/db.config.js')
const mongo = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
mongo.Promise = global.Promise

const db = {}
db.mongoose = mongo
db.url = dbConfig.url
db.articles = require("./article.model.js")(mongo, mongoosePaginate)
db.comments = require("./comment.model.js")(mongo)

module.exports = db
