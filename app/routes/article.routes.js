const articleController = require('../controllers/article.controller.js')
module.exports = app => {
    var router = require('express').Router()

    router.get("/", articleController.findAll)
    router.get("/:id", articleController.findOne)
    router.post("/", articleController.create)
    router.put("/:id", articleController.update)
    router.delete("/:id", articleController.delete)

    app.use('/api/articles', router)
}