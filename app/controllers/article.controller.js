const db = require('../model')
const articles = db.articles
const response = require('../response')
const utils = require('../utils')

exports.create = (req, res) => {
    const data = req.body
    if (!data.title || !data.content) {
        res.status(400).send(response.BuildResponse(400, "Content can not be empty", data))
        return
    }

    const article = new articles({
        title: data.title,
        content: data.content,
        is_publish: data.publish ? data.publish : false,
    })

    article.save(article).then(dataArticle => {
        res.status(200).send(response.BuildResponse(200, "Success create article", data))
    }).catch(err => {
        res.status(500).send(response.BuildResponse(500, err.message || "Can't create article", data))
    })
}

exports.update = (req, res) => {
    const data = req.body
    const {id} = req.params
    if (!data) {
        res.status(400).send(response.BuildResponse(400, "Content can not be empty", data))
        return
    }

    articles.findByIdAndUpdate(id, data, { userFindAndModify: false}).then(resUpdate => {
        if (!resUpdate) res.status(400).send(response.BuildResponse(400, `Can't update article with id ${id}`))
        else res.status(200).send(response.BuildResponse(200, "Article was updated successfully", data))
    }).catch(err => {
        res.status(500).send(response.BuildResponse(500, err.message || "Can't update article with id " + id, data))
    })

}

exports.delete = (req, res) => {
    const {id} = req.params

    articles.findByIdAndRemove(id).then(resDelete => {
        if (!resDelete) res.status(400).send(response.BuildResponse(400, `Can't delete article with id ${id}`))
        else res.status(200).send(response.BuildResponse(200, "Article was deleted successfully"))
    }).catch(err => {
        res.status(500).send(response.BuildResponse(500, err.message || "Can't delete article with id " + id))
    })
}

exports.findAll = (req, res) => {
    // Sort = DESC or ASC
    // startDate=2021-11-03
    // endDate=2021-11-04
    const {page, size, title, sort, startDate, endDate} = req.query
    const { limit, offset } = utils.GetPaginate(page, size)
    var condition = title ? {title: { $regex: new RegExp(title), $options: "i" }} : {}

    if (startDate !== undefined) {
        var gte = new Date(new Date(startDate).setHours(00, 00, 00))
        var lte = new Date(new Date(!endDate ? startDate : endDate).setHours(23, 59, 59))
        condition["created_at"] = {$gte: gte, $lt: lte}
    }

    articles.paginate(condition, {offset: offset, limit: limit, sort: {created_at: !sort ? sort : "asc"}}).then(data => {
        res.status(200).send(response.BuildResponsePaginate(data))
    }).catch(err => {
        res.status(500).send(response.BuildResponse(500, err.message || "Can't get article"))
    })
}

exports.findOne = (req, res) => {
    const {id} = req.params

    articles.findById(id).then(data => {
        if (!data) res.status(404).send(response.BuildResponse(404, "Data article not found for id" + id))
        else res.status(200).send(response.BuildResponse(200, "Success retrieve data", data))
    }).catch(err => {
        res.status(500).send(response.BuildResponse(500, err.message || "Can't get article"))
    })
}