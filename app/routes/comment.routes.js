const commentController = require("../controllers/comment.controller.js");
module.exports = app => {
    var router = require('express').Router()

    router.get("/", commentController.findAll)
    router.get("/:id", commentController.findOne)
    router.get("/article/:idArticle", commentController.findByArticle)
    router.post("/", commentController.create)
    router.put("/:id", commentController.update)
    router.delete("/:id", commentController.delete)

    app.use('/api/comments', router)
}